let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
} else {
    config.database = {
        hostname: "suleiman.db.elephantsql.com",
        database: "ogeknxiy",
        user: "ogeknxiy",
        password: "HhmHq5YuVK_fCW3kpERSQ3qx6fKmFjOB",
        port: 5432
    };
}

export { config }; 