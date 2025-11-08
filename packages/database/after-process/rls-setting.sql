ALTER TABLE "Organization" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Outsourcing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Member" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "Invitation" ENABLE ROW LEVEL SECURITY;

CREATE POLICY organization_isolation_policy ON "Organization" USING ("id" = current_setting('app.organizationId', TRUE)::TEXT);
CREATE POLICY organization_isolation_policy ON "Member" USING ("organizationId" = current_setting('app.organizationId', TRUE)::TEXT);
CREATE POLICY organization_isolation_policy ON "Team" USING ("organizationId" = current_setting('app.organizationId', TRUE)::TEXT);
CREATE POLICY organization_isolation_policy ON "Outsourcing" USING ("organizationId" = current_setting('app.organizationId', TRUE)::TEXT);
CREATE POLICY organization_isolation_policy ON "Project" USING ("organizationId" = current_setting('app.organizationId', TRUE)::TEXT);
-- CREATE POLICY organization_isolation_policy ON "Invitation" USING ("organizationId" = current_setting('app.organizationId', TRUE)::TEXT);

CREATE POLICY bypass_rls_policy ON "Session" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "Organization" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "Member" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
-- CREATE POLICY bypass_rls_policy ON "Invitation" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
