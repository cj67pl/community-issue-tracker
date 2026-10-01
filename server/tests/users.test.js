import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app.js";

const adminUser = {
	email: "testadmin@example.com",
	password: "TestPassword123",
};

const activeUser = {
	email: "testactive@example.com",
	password: "TestPassword123",
};

async function login(email, password) {
	const response = await request(app).post("/api/auth/login").send({
		email,
		password,
	});

	return response.body.token;
}

describe("Users", () => {
	it("should reject access to users without a token", async () => {
		const response = await request(app).get("/api/users");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access to users for a non-admin user", async () => {
		const token = await login(activeUser.email, activeUser.password);

		const response = await request(app)
			.get("/api/users")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should get users with an admin token", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/users")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/users")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should reject an invalid user ID", async () => {
		const token = await login(activeUser.email, activeUser.password);

		const response = await request(app)
			.get("/api/users/abc")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid user ID");
	});

	it("should return 404 for a user that does not exist", async () => {
		const token = await login(activeUser.email, activeUser.password);

		const response = await request(app)
			.get("/api/users/999999")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(404);
		expect(response.body.error).toBe("User not found");
	});
});
