import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">联系我</h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          有合作机会或想聊聊技术？欢迎通过邮件或 GitHub 与我联系。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            发送邮件
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            访问 GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
