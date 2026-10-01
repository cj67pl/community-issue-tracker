import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app.js";

const adminUser = {
	email: "testadmin@example.com",
	password: "TestPassword123",
};

const coordinatorUser = {
	email: "testcoordinator@example.com",
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

describe("Issues", () => {
	

	it("should reject access to issues without a token", async () => {
		const response = await request(app).get("/api/issues");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/issues")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should allow a reporter to access issues", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/issues")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should allow an admin to access issues", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/issues")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	

	it("should reject an invalid issue ID", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/issues/abc")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid issue ID");
	});

	it("should return 404 for a nonexistent issue", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/issues/999999")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(404);
		expect(response.body.error).toBe("Issue not found");
	});

	

	it("should reject issue creation without a token", async () => {
		const response = await request(app).post("/api/issues").send({});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject issue creation with missing required fields", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.post("/api/issues")
			.set("Authorization", `Bearer ${token}`)
			.send({});

		expect(response.status).toBe(400);
	});

	

	it("should reject issue updates without a token", async () => {
		const response = await request(app).patch("/api/issues/1").send({
			status_name: "Resolved",
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	

	it("should reject issue deletion without a token", async () => {
		const response = await request(app).delete("/api/issues/1");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	

	it("should reject issue filter options without a token", async () => {
		const response = await request(app).get("/api/issues/filters");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});
});
