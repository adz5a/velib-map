import { change, init } from "./diff";


const validValue = [
    null,
    0,
    NaN,
    {},
    {
        x: 2
    },
    Symbol(),
    "string",
    true,
    false,
    function () {},
];


const isEqual = (o1, o2) => {


    if ( o1 === o2 ) {
        return true;
    }


    const keys = Object.keys(o1);
    const l = keys.length;
    const equal = Object.keys(o2).length === l;

    let i = -1;
    let k;

    while( ++i < l && equal ) {
        k = keys[i];
        equal = o1[k] === o2[k];
    }
    return equal;
};


describe("init", () => {

    const propName = "name";


    test("empty object" , () => {

        expect.hasAssertions();
        const { hasProp, value } = init(propName, {});

        expect(hasProp).toBe(false);
        expect(value).toBe(undefined);

    });


    test("valid object" , () => {

        expect.hasAssertions();
        const expectedValue = {};
        const { hasProp, value } = init(propName, {
            [propName]: expectedValue
        });

        expect(hasProp).toBe(true);
        expect(value).toBe(expectedValue);

    });


});



describe("change", () => {


    describe("value", () => {

        const propName = "center";

        describe("should have undefined when not present", () => {

            test("should always be defined", () => {
                const prev = {
                    center: {}
                }
                const res = change(
                    propName,
                    prev,
                    {}
                );

                expect(res.hasOwnProperty("value")).toBe(true);
                expect.hasAssertions();
            });

            test("when present before", () => {
                const prev = {
                    center: {}
                }
                const res = change(
                    propName,
                    prev,
                    {}
                );
                expect(res.value).toBe(undefined);

                expect.hasAssertions();
            });
            test("when not present before", () => {
                const prev = {
                }
                const res = change(
                    propName,
                    prev,
                    {}
                );
                expect(res.value).toBe(undefined);

                expect.hasAssertions();
            });
        });

        test("should refer to correct value when present", () => {

            const expectedValue = {};
            const prev = {
            }

            const res = change(
                propName,
                prev,
                {
                    [propName]: expectedValue
                }
            );

            expect(res.value).toBe(expectedValue);
            
            // expect.hasAssertions();
        });

    });

    describe("hasProp", () => {

        it("should be true with a valid value", () => {

            const propName = "name";
            const prev = {
            };

            [
                null,
                0,
                false,
                true,
                {},
                "string",
                Symbol()
            ].forEach(( value ) => {
                const res = change(
                    propName,
                    prev,
                    {
                        [propName]: value
                    }
                );
                expect(res.hasProp).toBe(true);
            });

            expect.hasAssertions();
        });

        it("should be false with a undefined", () => {

            const propName = "name";
            const res = change(
                propName,
                {},
                {
                    [propName]: undefined
                }
            );
            expect(res.hasProp).toBe(false);

            expect.hasAssertions();
        });

        it("should be false with an unset property", () => {
            const propName = "name";
            const prev = {
            }
            const res = change(
                propName,
                prev,
                {
                    //[propName] does not exist
                    ["different" + propName]: {}
                }
            );
            expect(res.hasProp).toBe(false);

            expect.hasAssertions();
        });
    });

    // describe.skip("shape behaviour", () => {

    //     it("should not throw if shape changes", () => {
    //         expect.hasAssertions();
    //     });

    // });

    it("should throw if proName is not a string", () => {

        [
            null,
            undefined,
            NaN,
            0,
            {},
            true
        ].forEach((propName) => {

            expect(() => change(propName)).toThrow();

        });

        expect.hasAssertions();
    });

    it("it appears", () => {
        expect.hasAssertions();

        const prev = {
        };
        const propName = "center";
        
        [
            null,
            {},
            0,
            false,
            "string"
        ].forEach(val => {
            const res = change(
                propName,
                prev,
                { [propName]: val }
            );
            expect(res.appeared).toBe(true);
        });

        // should return false if value is undefined
        const res = change(
            propName,
            prev,
            { [propName]: undefined }
        );
        expect(res.appeared).toBe(false);

    });


    it("is removed", () => {
        expect.hasAssertions();

        const prop = "prop"

        validValue.forEach( value => {
            const prev = {
                [prop]: value
            }
            const next = {
            };

            const result = change(prop, prev, next);

            expect(result.removed).toBe(true);
        });

        validValue.forEach( value => {
            const prev = {
                [prop]: value
            }
            const next = {
                [prop]: undefined
            };

            const result = change(prop, prev, next);

            expect(result.removed).toBe(true);
        });

    });

    describe("didChange", () => {

        describe("diff function", () => {

            it("should throw if diff argument is not a function", () => {
                expect.hasAssertions();

                [
                    null,
                    Symbol(),
                    "string",
                    true,
                    false,
                    0,
                    NaN,
                ].forEach( v => {
                    expect(() => change(
                        "prop",
                        {},
                        {},
                        v
                    )).toThrow();
                } );

            });

            describe("should call the diff function when present", () => {

                test("when prop is present in both", () => {
                    expect.hasAssertions();

                    const diff = jest.fn((a, b) => a === b);

                    change(
                        "prop",
                        {
                            prop: 1
                        },
                        {
                            prop: 2
                        },
                        diff
                    );

                    expect(diff.mock.calls.length).toBe(1);
                });

                test("not when prop is absent in either ones", () => {

                    expect.hasAssertions();

                    const empty = {}
                    const o1 = { prop: 1 };

                    [
                        [empty, o1],
                        [o1, empty],
                        [empty, empty]
                    ].forEach(([prev, next]) => {
                        const diff = jest.fn((a, b) => a === b);
                        change(
                            "prop",
                            prev,
                            next,
                            diff
                        );
                        expect(diff.mock.calls.length).toBe(0);
                    });
                });

                test("output of diff is returned in didChange", () => {
                    expect.hasAssertions();
                    const expectedValue = {};

                    const diff = jest.fn((a, b) => expectedValue);

                    const res = change(
                        "prop",
                        {
                            prop: 1
                        },
                        {
                            prop: 2
                        },
                        diff
                    );

                    expect(res.didChange).toBe(expectedValue);
                });

            });
        });

    });


});

test("isEqual", () => {

    const obj = {};
    expect(isEqual(obj, {})).toBe(true);
    expect(isEqual(obj, obj)).toBe(true);

    expect.hasAssertions();
});
