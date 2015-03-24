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
            expect(e.type).toBe(Entity.DYNAMIC);
            expect(e.x).toBe(0);
            expect(e.y).toBe(0);
            expect(e.bounds).toEqual(jasmine.any(CircleBounds));
            expect(e.bounds.radius).toBe(0.5);
            expect(e.vx).toBe(0);
            expect(e.vy).toBe(0);
            expect(e.ax).toBe(0);
            expect(e.ay).toBe(0);
            expect(e.restitution).toBe(0);
            expect(e.friction).toBe(1);
        });
    });
});
