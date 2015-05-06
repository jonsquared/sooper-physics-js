describe('RectangleBounds', function() {

    it('exists', function() {
        expect(RectangleBounds).toBeDefined();
    });

    it('has correct static properties', function() {
        expect(RectangleBounds.TYPE).toBe(0x0002);
    });

    describe('default constructor', function() {
        var bounds;

        it('does not throw an error', function() {
            expect(function () {
                bounds = new RectangleBounds();
            }).not.toThrow();
        });

        it('has correct default properties', function() {
            expect(bounds.boundsType).toBe(RectangleBounds.TYPE);
            expect(bounds.width).toBe(1);
            expect(bounds.height).toBe(1);
        });
    });

    describe('constructor', function() {

        it('accepts a configuration of all configurable properties', function() {
            var config = {
                width:4,
                height:2
            };
            expect(new RectangleBounds(config)).toEqual(jasmine.objectContaining(config));
        })

    });
});
