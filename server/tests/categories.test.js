import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app.js";

const adminUser = {
	email: "testadmin@example.com",
	password: "TestPassword123",
};

const reporterUser = {
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

describe("Categories", () => {
	

	it("should reject access to categories without a token", async () => {
		const response = await request(app).get("/api/categories");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/categories")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should allow an authenticated user to access categories", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/categories")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	

	it("should reject category creation without a token", async () => {
		const response = await request(app).post("/api/categories").send({
			name: "Test Category",
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject category creation for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.post("/api/categories")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Test Category",
			});

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should reject category creation with invalid data", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.post("/api/categories")
			.set("Authorization", `Bearer ${token}`)
			.send({});

		expect(response.status).toBe(400);
	});

	

	it("should reject category update without a token", async () => {
		const response = await request(app).patch("/api/categories/1").send({
			name: "Updated Category",
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject an invalid category ID", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.patch("/api/categories/abc")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Updated Category",
			});

		expect(response.status).toBe(400);
	});
});
