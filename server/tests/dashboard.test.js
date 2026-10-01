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

describe("Dashboard", () => {


	it("should reject coordinator KPIs without a token", async () => {
		const response = await request(app).get("/api/dashboard/kpis");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject coordinator KPIs for a reporter", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/dashboard/kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return coordinator KPIs for a coordinator", async () => {
		const token = await login(
			coordinatorUser.email,
			coordinatorUser.password,
		);

		const response = await request(app)
			.get("/api/dashboard/kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("kpis");
	});

	

	it("should reject user KPIs without a token", async () => {
		const response = await request(app).get("/api/dashboard/user-kpis");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject user KPIs for a coordinator", async () => {
		const token = await login(
			coordinatorUser.email,
			coordinatorUser.password,
		);

		const response = await request(app)
			.get("/api/dashboard/user-kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return user KPIs for a reporter", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/dashboard/user-kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("kpis");
	});



	it("should reject admin KPIs without a token", async () => {
		const response = await request(app).get("/api/dashboard/admin-kpis");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject admin KPIs for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/dashboard/admin-kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return admin KPIs for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/dashboard/admin-kpis")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("kpis");
	});

	

	it("should reject admin issue counts without a token", async () => {
		const response = await request(app).get(
			"/api/dashboard/admin-issues-counts",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject admin issue counts for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/dashboard/admin-issues-counts")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return admin issue counts for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/dashboard/admin-issues-counts")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("issues_by_category");
		expect(response.body).toHaveProperty("issues_by_status");
	});

	

	it("should reject dashboard categories without a token", async () => {
		const response = await request(app).get("/api/dashboard/categories");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return dashboard categories for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/dashboard/categories")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("categories");
		expect(Array.isArray(response.body.categories)).toBe(true);
	});

	

	it("should reject recent issues without a token", async () => {
		const response = await request(app).get("/api/dashboard/recent/issues");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return recent issues for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/dashboard/recent/issues")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("issues");
		expect(Array.isArray(response.body.issues)).toBe(true);
	});

	

	it("should reject urgent issues without a token", async () => {
		const response = await request(app).get("/api/dashboard/urgent");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject urgent issues for a reporter", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/dashboard/urgent")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return urgent issues for a coordinator", async () => {
		const token = await login(
			coordinatorUser.email,
			coordinatorUser.password,
		);

		const response = await request(app)
			.get("/api/dashboard/urgent")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("issues");
		expect(Array.isArray(response.body.issues)).toBe(true);
	});
});
