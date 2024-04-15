import request from "supertest";

import app from "../../../src/app";

describe("POST /api/v1/auth", () => {
	it("should return 400 error with message 'Email could not empty'", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "  " })
			.expect(400, { status: "error", message: "Email could not empty" });
	});

	it("should return 400 error with message 'Invalid email'", () => {
		return request(app).post("/api/v1/auth/login").send({ email: "invalid" }).expect(400, {
			status: "error",
			message: "Invalid email",
		});
	});

	it("should return 200 OK", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "test@gmail.com" })
			.expect(200);
	});

	// TODO: how to test the token?
	it("should successful login", () => {
		return request(app)
			.post("/api/v1/auth/login/validation/9b7573f9-44e7-4ec4-be3b-d55341b72f21/373885")
			.expect(200, { status: "ok", message: "Successful login" });
	});
});
