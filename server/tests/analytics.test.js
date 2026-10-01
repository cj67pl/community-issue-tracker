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
	const response = await request(app)
		.post("/api/auth/login")
		.send({ email, password });

	return response.body.token;
}

describe("Analytics", () => {
	
    //kpis

	it("should reject analytics KPI without a token", async () => {
		const response = await request(app).get("/api/analytics/kpi");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject analytics KPI for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/analytics/kpi")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return analytics KPI for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/kpi")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("averageResolution");
		expect(response.body).toHaveProperty("resolutionRate");
		expect(response.body).toHaveProperty("totalMonthlyReports");
		expect(response.body).toHaveProperty("topReportedLocation");
	});

	it("should reject analytics KPI with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/kpi?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

    //issues trends

	it("should reject issue trends without a token", async () => {
		const response = await request(app).get("/api/analytics/trends");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject issue trends for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/analytics/trends")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return issue trends for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/trends")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject issue trends with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/trends?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	//issues by status

	it("should reject issue trends by status without a token", async () => {
		const response = await request(app).get("/api/analytics/by-status");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return issue trends by status for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/by-status")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject issue trends by status with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/by-status?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	// issues by category

	it("should reject issues by category without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/count-categories",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return issues by category for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-categories")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject issues by category with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-categories?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	//issues by priority

	it("should reject issues by priority without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/count-priorities",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return issues by priority for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-priorities")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject issues by priority with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-priorities?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	//issues by loc

	it("should reject issues by location without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/count-locations",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return issues by location for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-locations")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should reject issues by location with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/count-locations?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	//resolution stats

	it("should reject resolution stats without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/resolution-stats",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject resolution stats for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/analytics/resolution-stats")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return resolution stats for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/resolution-stats")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("overdue_issues");
		expect(response.body).toHaveProperty("resolved_within_target");
		expect(response.body).toHaveProperty("oldest_unresolved_days");
		expect(response.body).toHaveProperty("pending_over_30_days");
	});

    //period comparison

	it("should reject period comparison without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/period-comparison",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should return period comparison for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/period-comparison")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("current");
		expect(response.body).toHaveProperty("previous");
	});

	it("should reject period comparison with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/period-comparison?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});

	//CSV export

	it("should reject analytics CSV export without a token", async () => {
		const response = await request(app).get("/api/analytics/export");

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject analytics CSV export for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/analytics/export")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});

	it("should return CSV export for an admin", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/export")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toContain("text/csv");
		expect(response.text).toContain("Summary");
		expect(response.text).toContain("Average Resolution Time (days)");
		expect(response.text).toContain("Resolution Rate (%)");
	});

	it("should reject analytics CSV export with an invalid date range", async () => {
		const token = await login(adminUser.email, adminUser.password);

		const response = await request(app)
			.get("/api/analytics/export?range=invalid")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("Invalid date range");
	});


	// analytics exports
	

	it("should reject analytics export without a token", async () => {
		const response = await request(app).get(
			"/api/analytics/analytics-export",
		);

		expect(response.status).toBe(401);
		expect(response.body.error).toBe("Access token is required");
	});

	it("should reject analytics export for a non-admin user", async () => {
		const token = await login(reporterUser.email, reporterUser.password);

		const response = await request(app)
			.get("/api/analytics/analytics-export")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(403);
		expect(response.body.error).toBe(
			"You do not have permission to perform this action",
		);
	});
});
