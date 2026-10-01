import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app.js";

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

describe("Notifications", () => {
	

	it("should reject access to notifications without a token", async () => {
		const response = await request(app).get("/api/notifications");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/notifications")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should allow an authenticated user to access notifications", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/notifications")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	

	it("should reject marking a notification as read without a token", async () => {
		const response = await request(app).patch("/api/notifications/1/read");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject an invalid notification ID", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.patch("/api/notifications/abc/read")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid notification ID");
	});

	

	it("should reject marking all notifications as read without a token", async () => {
		const response = await request(app).patch(
			"/api/notifications/read-all",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should allow an authenticated user to mark all notifications as read", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.patch("/api/notifications/read-all")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
	});
});
