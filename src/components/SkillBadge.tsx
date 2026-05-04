import type { Skill } from '@/data/resume';

interface SkillBadgeProps {
  skill: Skill;
}

function SkillBadge({ skill }: SkillBadgeProps) {
  const iconColor = skill.color.replace('#', '');
  const iconSrc = skill.icon ? `https://cdn.simpleicons.org/${skill.icon}/${iconColor}` : null;

  return (
    <span
      className="inline-flex h-8 items-center gap-2 rounded-md border bg-white px-3 text-xs font-bold text-zinc-800 shadow-sm"
      style={{
        borderColor: `${skill.color}55`,
        backgroundColor: `${skill.color}10`,
      }}
    >
      {iconSrc && <img src={iconSrc} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" loading="lazy" />}
      {skill.label}
    </span>
  );
}

export default SkillBadge;
