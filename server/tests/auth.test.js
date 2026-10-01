import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app.js";

describe("Authentication", () => {
	it("should reject login with invalid credentials", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "wrong@example.com",
			password: "wrongpassword",
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid email or password");
	});

	it("should reject login with invalid email format", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "not-an-email",
			password: "password123",
		});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid email or password");
	});

	it("should reject login when credentials are missing", async () => {
		const response = await request(app).post("/api/auth/login").send({});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid email or password");
	});

	it("should login successfully with valid credentials", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "testactive@example.com",
			password: "TestPassword123",
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty("user");
	});

	it("should return the current user with a valid token", async () => {
		const loginResponse = await request(app).post("/api/auth/login").send({
			email: "testactive@example.com",
			password: "TestPassword123",
		});

		const token = loginResponse.body.token;

		const response = await request(app)
			.get("/api/auth/me")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("user");
	});

	it("should reject access to current user without a token", async () => {
		const response = await request(app).get("/api/auth/me");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/auth/me")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should reject login for an inactive account", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "test.inactive@example.com",
			password: "TestPassword123",
		});

		expect(response.status).toBe(403);
		expect(response.body.error).toBe("Account is inactive");
	});
});
