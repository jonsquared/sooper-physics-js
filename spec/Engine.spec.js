describe('Engine', function() {
    var engine;

    it('exists', function() {
        expect(Engine).toBeDefined();
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
            expect(engine.entityUpdater).toEqual(jasmine.any(EntityUpdater));
            expect(engine.collisionDetector).toEqual(jasmine.any(CollisionDetector));
        });
    });

    describe('constructor', function() {
        it('can be given custom components', function() {
            var config = {
                entityUpdater: { update: function() {} },
                collisionDetector: { detect: function() {} }
            }

            engine = new Engine(config);

            expect(engine.entityUpdater).toBe(config.entityUpdater);
            expect(engine.collisionDetector).toBe(config.collisionDetector);
        });
    });

    describe('step', function() {
        it('calls collision dector detect', function() {
            spyOn(engine.entityUpdater, 'update');
            spyOn(engine.collisionDetector, 'detect');
            engine.step(1);
            expect(engine.entityUpdater.update).toHaveBeenCalledWith(engine.entities,1);
            expect(engine.collisionDetector.detect).toHaveBeenCalledWith(engine.entities);
        });
    });
});
