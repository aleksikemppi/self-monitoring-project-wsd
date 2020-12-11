import { superoak } from '../deps.js';
import { app } from '../app.js';
import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";


  Deno.test({
    name: "POST to /behavior/reporting should return Reporting successful!",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
      const testClient = await superoak(app);
      await testClient.post("/behavior/reporting")
            .expect(404);
    },
  });
  
  Deno.test({
    name: "GET to /behavior/reportingnight should return HTML-document and status OK without user in cookies",
    sanitizeResources: false,
    sanitizeOps: false,
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/behavior/reportingnight")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200);
    }
});

Deno.test({
  name: "GET to /behavior/reportingmorning should return HTML-document and status OK without user in cookies",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/behavior/reportingmorning")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(200);
  }
});

Deno.test({
  name: "GET to /behavior/summary should return HTML-document and status OK without user in cookies",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/behavior/summary")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(200);
  }
});
Deno.test({
  name: "GET to /landing should return HTML-document and status OK without user in cookies",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/landing")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(200);
  }
});


Deno.test({
  name: "GET to / return HTML-document and status OK without user in cookies",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(200);
  }
});

Deno.test({
  name: "GET to /auth/registration return HTML-document and status OK without user in cookies",
  sanitizeResources: false,
  sanitizeOps: false,
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/auth/registration")
          .expect("Content-Type", "text/html; charset=utf-8")
          .expect(200);
  }
});






