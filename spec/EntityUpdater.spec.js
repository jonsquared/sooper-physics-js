describe('EntityUpdater', function() {
    var updater, entities;

    it('exists', function() {
        expect(EntityUpdater).toBeDefined();
    });

    it('has correct static properties', function() {
        expect(EntityUpdater.GRAVITY_X).toBe(0);
        expect(EntityUpdater.GRAVITY_Y).toBe(0);
    });

    describe('default constructor', function() {
        it('does not throw an error', function() {
            expect(function () {
                updater = new EntityUpdater();
            }).not.toThrow();
        });
    });

    describe('update', function() {
        describe('given static entities with velocity and acceleration', function() {
            it('when called with entities and elapsed time, velocity and position are unchanged', function() {
                entities = [
                    new Entity({
                        type: Entity.STATIC,
                        ax: 0.5,
                        ay: 1,
                        vx: 0.5,
                        vy: 1
                    }),
                    new Entity({
                        type: Entity.STATIC,
                        ax: -0.5,
                        ay: -1,
                        vx: -0.5,
                        vy: -1
                    })
                ];

                updater.update(entities,1);

                expect(entities[0]).toEqual(jasmine.objectContaining({
                    ax: 0.5,
                    ay: 1,
                    vx: 0.5,
                    vy: 1
                }));

                expect(entities[1]).toEqual(jasmine.objectContaining({
                    ax: -0.5,
                    ay: -1,
                    vx: -0.5,
                    vy: -1
                }));
            });
        });

        describe('given dynamic entities and non-zero gravity', function() {
            beforeEach(function() {
                EntityUpdater.GRAVITY_X = 1;
                EntityUpdater.GRAVITY_Y = 1;
            });

            describe('with velocity', function() {
                beforeEach(function() {
                    entities = [
                        new Entity({
                            vx: 0.5,
                            vy: 1
                        }),
                        new Entity({
                            vx: -0.5,
                            vy: -1
                        })
                    ]
                });

                it('when called with an elapsed time, then it updates the positions correctly', function() {
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 1.5,
                        y: 2
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 0
                    }));
                });

                it('when called twice, updates positions correctly', function() {
                    updater.update(entities,1);
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 4,
                        y: 5
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: 2,
                        y: 1
                    }));
                });

                it('when velocity is changed between steps, updates positions correctly', function() {
                    updater.update(entities,1);
                    entities[0].vx = 1;
                    entities[0].vy = 0.5;
                    entities[1].vx = -1;
                    entities[1].vy = -0.5;
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 3.5,
                        y: 3.5
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 0.5
                    }));
                });
            });

            describe('with acceleration', function() {
                beforeEach(function() {
                    entities = [
                        new Entity({
                            ax: 0.5,
                            ay: 1
                        }),
                        new Entity({
                            ax: -0.5,
                            ay: -1
                        })
                    ]
                });

                it('when called with an elapsed time, then it updates the velocities and positions correctly', function() {
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1.5,
                        vy: 2,
                        x: 1.5,
                        y: 2
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: 0.5,
                        vy: 0,
                        x: 0.5,
                        y: 0
                    }));
                });

                it('when called twice, updates velocities and positions correctly', function() {
                    updater.update(entities,1);
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 3,
                        vy: 4,
                        x: 4.5,
                        y: 6
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: 1,
                        vy: 0,
                        x: 1.5,
                        y: 0
                    }));
                });

                it('when acceleration is changed between steps, updates velocities and positions correctly', function() {
                    updater.update(entities,1);
                    entities[0].ax = 1;
                    entities[0].ay = 0.5;
                    entities[1].ax = -1;
                    entities[1].ay = -0.5;
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 3.5,
                        vy: 3.5,
                        x: 5,
                        y: 5.5
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: 0.5,
                        vy: 0.5,
                        x: 1,
                        y: 0.5
                    }));
                });
            });
        });

        describe('given kinematic entities and non-zero gravity', function() {
            beforeEach(function() {
                EntityUpdater.GRAVITY_X = 1;
                EntityUpdater.GRAVITY_Y = 1;
            });

            describe('with velocity', function() {
                beforeEach(function() {
                    entities = [
                        new Entity({
                            type: Entity.KINEMATIC,
                            vx: 0.5,
                            vy: 1
                        }),
                        new Entity({
                            type: Entity.KINEMATIC,
                            vx: -0.5,
                            vy: -1
                        })
                    ]
                });

                it('when called with an elapsed time, then it updates the positions correctly', function() {
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 1
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: -0.5,
                        y: -1
                    }));
                });

                it('when called twice, updates positions correctly', function() {
                    updater.update(entities,1);
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 1,
                        y: 2
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: -1,
                        y: -2
                    }));
                });

                it('when velocity is changed between steps, updates positions correctly', function() {
                    updater.update(entities,1);
                    entities[0].vx = 1;
                    entities[0].vy = 0.5;
                    entities[1].vx = -1;
                    entities[1].vy = -0.5;
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        x: 1.5,
                        y: 1.5
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        x: -1.5,
                        y: -1.5
                    }));
                });
            });

            describe('with acceleration', function() {
                beforeEach(function() {
                    entities = [
                        new Entity({
                            type: Entity.KINEMATIC,
                            ax: 0.5,
                            ay: 1
                        }),
                        new Entity({
                            type: Entity.KINEMATIC,
                            ax: -0.5,
                            ay: -1
                        })
                    ]
                });

                it('when called with an elapsed time, then it updates the velocities and positions correctly', function() {
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 0.5,
                        vy: 1,
                        x: 0.5,
                        y: 1
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: -0.5,
                        vy: -1,
                        x: -0.5,
                        y: -1
                    }));
                });

                it('when called twice, updates velocities and positions correctly', function() {
                    updater.update(entities,1);
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1,
                        vy: 2,
                        x: 1.5,
                        y: 3
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: -1,
                        vy: -2,
                        x: -1.5,
                        y: -3
                    }));
                });

                it('when acceleration is changed between steps, updates velocities and positions correctly', function() {
                    updater.update(entities,1);
                    entities[0].ax = 1;
                    entities[0].ay = 0.5;
                    entities[1].ax = -1;
                    entities[1].ay = -0.5;
                    updater.update(entities,1);
                    expect(entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1.5,
                        vy: 1.5,
                        x: 2,
                        y: 2.5
                    }));
                    expect(entities[1]).toEqual(jasmine.objectContaining({
                        vx: -1.5,
                        vy: -1.5,
                        x: -2,
                        y: -2.5
                    }));
                });
            });
        });
    });
});
