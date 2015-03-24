describe('CircleBounds', function() {
    it('exists', function() {
        expect(CircleBounds).toBeDefined();
    });
    describe('default constructor', function() {
        var bounds;
        it('does not throw an error', function() {
            expect(function () {
                bounds = new CircleBounds();
            }).not.toThrow();
        });
        it('has correct default properties', function() {
            expect(e.radius).toBe(0.5);
        });
    });
}
