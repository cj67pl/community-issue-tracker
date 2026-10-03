const demoMode = (req, res, next) => {
	if (process.env.DEMO_MODE === "true") {
		return res.status(403).json({
			message: "This action is disabled in demo mode.",
		});
	}

	next();
};

export default demoMode;
