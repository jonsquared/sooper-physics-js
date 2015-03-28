describe('CircleBounds', function() {

    it('exists', function() {
        expect(CircleBounds).toBeDefined();
    });

    it('has correct static properties', function() {
        expect(CircleBounds.TYPE).toBe('circle');
    });

    describe('default constructor', function() {
        var bounds;
        it('does not throw an error', function() {
            expect(function () {
                bounds = new CircleBounds();
            }).not.toThrow();
        });
        it('has correct default properties', function() {
            expect(bounds.boundsType).toBe(CircleBounds.TYPE);
            expect(bounds.radius).toBe(0.5);
        });
    });

    describe('constructor', function() {
        it('accepts a configuration of all configurable properties', function() {
            var config = {
                radius: 42
            };
            expect((new CircleBounds(config))).toEqual(jasmine.objectContaining(config));
        })
    });
});
