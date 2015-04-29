describe('Engine', function() {
    var engine;

    it('exists', function() {
        expect(Engine).toBeDefined();
    });

    it('has correct static properties', function() {
        expect(Engine.GRAVITY_X).toBe(0);
        expect(Engine.GRAVITY_Y).toBe(0);
    });

    describe('default constructor', function() {
        it('does not throw an error', function() {
            expect(function () {
                engine = new Engine();
            }).not.toThrow();
        });

        it('has correct default properties', function() {
            expect(Array.isArray(engine.entities)).toBe(true);
            expect(engine.entities.length).toBe(0);
        });
    });

    describe('step', function() {
        it('exists', function() {
            expect(function(){
                engine.step();
            }).not.toThrow();
        });

        describe('given static entities with velocity and acceleration', function() {
            it('when called with an elapsed time, velocity and position are unchanged', function() {
                engine.entities = [
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

                engine.step(1);

                expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                    ax: 0.5,
                    ay: 1,
                    vx: 0.5,
                    vy: 1
                }));

                expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                    ax: -0.5,
                    ay: -1,
                    vx: -0.5,
                    vy: -1
                }));
            });
        });

        describe('given dynamic entities and non-zero gravity', function() {
            beforeEach(function() {
                Engine.GRAVITY_X = 1;
                Engine.GRAVITY_Y = 1;
            });

            describe('with velocity', function() {
                beforeEach(function() {
                    engine.entities = [
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
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 1.5,
                        y: 2
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 0
                    }));
                });

                it('when called twice, updates positions correctly', function() {
                    engine.step(1);
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 4,
                        y: 5
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: 2,
                        y: 1
                    }));
                });

                it('when velocity is changed between steps, updates positions correctly', function() {
                    engine.step(1);
                    engine.entities[0].vx = 1;
                    engine.entities[0].vy = 0.5;
                    engine.entities[1].vx = -1;
                    engine.entities[1].vy = -0.5;
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 3.5,
                        y: 3.5
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 0.5
                    }));
                });
            });

            describe('with acceleration', function() {
                beforeEach(function() {
                    engine.entities = [
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
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1.5,
                        vy: 2,
                        x: 1.5,
                        y: 2
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        vx: 0.5,
                        vy: 0,
                        x: 0.5,
                        y: 0
                    }));
                });

                it('when called twice, updates velocities and positions correctly', function() {
                    engine.step(1);
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 3,
                        vy: 4,
                        x: 4.5,
                        y: 6
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        vx: 1,
                        vy: 0,
                        x: 1.5,
                        y: 0
                    }));
                });

                it('when acceleration is changed between steps, updates velocities and positions correctly', function() {
                    engine.step(1);
                    engine.entities[0].ax = 1;
                    engine.entities[0].ay = 0.5;
                    engine.entities[1].ax = -1;
                    engine.entities[1].ay = -0.5;
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 3.5,
                        vy: 3.5,
                        x: 5,
                        y: 5.5
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
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
                engine.GRAVITY_X = 1;
                engine.GRAVITY_Y = 1;
            });

            describe('with velocity', function() {
                beforeEach(function() {
                    engine.entities = [
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
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 0.5,
                        y: 1
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: -0.5,
                        y: -1
                    }));
                });

                it('when called twice, updates positions correctly', function() {
                    engine.step(1);
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 1,
                        y: 2
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: -1,
                        y: -2
                    }));
                });

                it('when velocity is changed between steps, updates positions correctly', function() {
                    engine.step(1);
                    engine.entities[0].vx = 1;
                    engine.entities[0].vy = 0.5;
                    engine.entities[1].vx = -1;
                    engine.entities[1].vy = -0.5;
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        x: 1.5,
                        y: 1.5
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        x: -1.5,
                        y: -1.5
                    }));
                });
            });

            describe('with acceleration', function() {
                beforeEach(function() {
                    engine.entities = [
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
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 0.5,
                        vy: 1,
                        x: 0.5,
                        y: 1
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        vx: -0.5,
                        vy: -1,
                        x: -0.5,
                        y: -1
                    }));
                });

                it('when called twice, updates velocities and positions correctly', function() {
                    engine.step(1);
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1,
                        vy: 2,
                        x: 1.5,
                        y: 3
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
                        vx: -1,
                        vy: -2,
                        x: -1.5,
                        y: -3
                    }));
                });

                it('when acceleration is changed between steps, updates velocities and positions correctly', function() {
                    engine.step(1);
                    engine.entities[0].ax = 1;
                    engine.entities[0].ay = 0.5;
                    engine.entities[1].ax = -1;
                    engine.entities[1].ay = -0.5;
                    engine.step(1);
                    expect(engine.entities[0]).toEqual(jasmine.objectContaining({
                        vx: 1.5,
                        vy: 1.5,
                        x: 2,
                        y: 2.5
                    }));
                    expect(engine.entities[1]).toEqual(jasmine.objectContaining({
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
