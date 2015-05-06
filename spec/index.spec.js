describe('physics', function() {
    it('exists', function() {
        expect(physics).toBeDefined();
    });

    it('has expected classes', function() {
        expect(physics.Entity).toBe(Entity);
        expect(physics.CircleEntity).toBe(CircleEntity);
        expect(physics.RectangleEntity).toBe(RectangleEntity);
        expect(physics.CircleBounds).toBe(CircleBounds);
        expect(physics.RectangleBounds).toBe(RectangleBounds);
        expect(physics.Engine).toBe(Engine);
        expect(physics.EntityUpdater).toBe(EntityUpdater);
        expect(physics.CollisionDetector).toBe(CollisionDetector);
    });
});
