describe('physics', function() {
    it('exists', function() {
        expect(physics).toBeDefined();
    });

    it('has expected classes', function() {
        expect(physics.Entity).toBeDefined();
        expect(physics.CircleEntity).toBeDefined();
        expect(physics.RectangleEntity).toBeDefined();
    });
});
