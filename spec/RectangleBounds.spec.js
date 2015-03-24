describe('RectangleBounds', function() {
    it('exists', function() {
        expect(RectangleBounds).toBeDefined();
    });
    describe('default constructor', function() {
        var bounds;
        it('does not throw an error', function() {
            expect(function () {
                bounds = new RectangleBounds();
            }).not.toThrow();
        });
        it('has correct default properties', function() {
            expect(e.width).toBe(1);
            expect(e.height).toBe(1);
        });
    });
}
