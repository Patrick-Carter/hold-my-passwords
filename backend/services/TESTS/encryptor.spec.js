const Encryptor = require("../encryptor");

describe("Testing Encryptor", () => {
    //setup
    const encryptor = new Encryptor();

    test("should hash a given string", async () => {
        const original = "test";
        const afterHash = await encryptor.Encrypt(original);
        expect(afterHash).not.toBe(original);
    })

    test("should be able to correctly match a hashed value", async () => {
        const original = "test";
        const afterHash = await encryptor.Encrypt(original); 
        const areTheyTheSameAfterComparing = await encryptor.Decrypt(original, afterHash);
        expect(areTheyTheSameAfterComparing).toBe(true);
    })
})