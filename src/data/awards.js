import getWork from "./archive.js";

export default function () {
  const organizations = new Map();

  getWork().forEach(client => {
    client.projects?.forEach(project => {
      project.awards?.forEach(award => {
        if (!organizations.has(award.organization)) {
          organizations.set(award.organization, {
            organization: award.organization,
            count: 0,
            details: new Map(),
          });
        }

        const organization = organizations.get(award.organization);
        organization.count++;

        organization.details.set(
          award.title,
          (organization.details.get(award.title) ?? 0) + 1
        );
      });
    });
  });

  return [...organizations.values()]
    .map(organization => ({
      organization: organization.organization,
      count: organization.count,
      details: [...organization.details.entries()]
        .map(([title, count]) => ({
          title,
          count,
        }))
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.organization.localeCompare(b.organization));
}