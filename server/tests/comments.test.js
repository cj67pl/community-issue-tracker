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

describe("Comments", () => {
	

	it("should reject access to comments without a token", async () => {
		const response = await request(app).get("/api/issues/1/comments");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject access with an invalid token", async () => {
		const response = await request(app)
			.get("/api/issues/1/comments")
			.set("Authorization", "Bearer invalid-token");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Invalid or expired token");
	});

	it("should reject an invalid issue ID", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/issues/abc/comments")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid issue ID");
	});

	it("should return an empty array when the issue has no comments", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/issues/999999/comments")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	

	it("should reject creating a comment without a token", async () => {
		const response = await request(app)
			.post("/api/issues/1/comments")
			.send({
				content: "Test comment",
			});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject creating a comment with an invalid issue ID", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.post("/api/issues/abc/comments")
			.set("Authorization", `Bearer ${token}`)
			.send({
				content: "Test comment",
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid issue ID");
	});

	it("should return 404 when creating a comment for a nonexistent issue", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.post("/api/issues/999999/comments")
			.set("Authorization", `Bearer ${token}`)
			.send({
				content: "Test comment",
			});

		expect(response.status).toBe(404);
		expect(response.body.error).toBe("Issue not found");
	});

	it("should reject an empty comment", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.post("/api/issues/1/comments")
			.set("Authorization", `Bearer ${token}`)
			.send({
				content: "",
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Comment content is required");
	});
});
