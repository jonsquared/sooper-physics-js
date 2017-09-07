describe('Entity', function() {
    it('exists', function() {
        expect(Entity).toBeDefined();
    });

    it('has correct static properties', function() {
        expect(Entity.STATIC).toBeDefined();
        expect(Entity.KINEMATIC).toBeDefined();
        expect(Entity.DYNAMIC).toBeDefined();
    });

    describe('default constructor', function() {
        var e;
        it('does not throw an error', function() {
            expect(function () {
                e = new Entity();
            }).not.toThrow();
        });
        it('has correct default properties', function() {
            expect(e).toEqual(jasmine.objectContaining({
                type: Entity.DYNAMIC,
                mass: 1,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                friction: 1,
                collisionCategory: 0x00000001,
                collisionMask: 0xFFFFFFFF
            }));
        });
    });

    describe('constructor', function() {
        it('accepts a configuration of all configurable properties', function() {
            var config = {
                type: Entity.STATIC,
                x: 1,
                y: 2,
                vx: 3,
                vy: 4,
                ax: 5,
                ay: 6,
                friction: 0.6,
                collisionCategory: 0x0002,
                collisionMask: 0x0000
            };

            expect(new Entity(config)).toEqual(jasmine.objectContaining(config));
        })
    });
});
