import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/site";

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">技能</h2>
        <div className="flex flex-wrap gap-3">
          {siteConfig.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
