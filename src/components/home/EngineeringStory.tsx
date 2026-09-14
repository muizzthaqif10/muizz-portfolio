import { ArrowDown, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechBadge } from '@/components/ui/TechBadge';

const flowSteps = [
  'External / legacy systems',
  'REST API',
  'CloudLink.AI middleware',
  'Message transformation',
  'Mapping & routing',
  'Mobius Core Banking',
];

const progression = ['Frontend development', 'Backend development', 'Enterprise integration', 'Core banking', 'Cloud / Kubernetes'];

export function EngineeringStory() {
  return (
    <section className="section-wash border-b border-border py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="engineering-focus" title="The work between systems" />
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              My strongest work is making separate systems exchange reliable, usable data. At Silverlake,
              CloudLink.AI acts as a cloud-native middleware platform between Mobius Core Banking and the
              external or legacy systems around it.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'REST APIs', 'System Integration', 'Kubernetes', 'Docker'].map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              I contribute through integration-flow analysis, API and message mapping, transformation debugging,
              technical documentation, Postman validation and Kubernetes environment troubleshooting.
            </p>
          </div>

          <div className="surface-lift rounded-xl border border-border bg-surface/80 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted">cloudlink.integration-flow</p>
              <span className="font-mono text-xs text-signal">JSON | XML | FIXED_LENGTH</span>
            </div>
            <div className="flex flex-col items-stretch gap-2">
              {flowSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className="flex min-h-14 w-full items-center justify-center border border-border-strong bg-surface-raised px-3 py-2 text-center font-mono text-xs leading-relaxed text-foreground">
                    {step}
                  </div>
                  {index < flowSteps.length - 1 && (
                    <ArrowDown size={15} className="shrink-0 text-accent" aria-hidden />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted">
              The platform transforms JSON, fixed-length and XML messages, applies mapping and lookup rules,
              then routes the translated request or response to the right system.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-16">
          <div>
            <SectionHeading eyebrow="career-progression" title="A path toward systems engineering" />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {progression.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="border border-border-strong bg-surface px-3 py-2 text-sm text-foreground">{step}</span>
                  {index < progression.length - 1 && <ArrowRight size={14} className="text-accent" aria-hidden />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}