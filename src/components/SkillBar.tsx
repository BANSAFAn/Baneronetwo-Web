interface SkillBarProps {
  name: string;
  percentage: number;
  logo?: string;
}

export const SkillBar = ({ name, percentage, logo }: SkillBarProps) => {
  // Get color based on skill name
  const getGlowColor = (skillName: string) => {
    switch (skillName) {
      case 'Rust':
        return 'rgba(222, 165, 132, 0.6)';
      case 'C Holy':
        return 'rgba(86, 182, 194, 0.6)';
      case 'C':
        return 'rgba(92, 179, 255, 0.6)';
      case 'TypeScript':
        return 'rgba(49, 120, 198, 0.6)';
      case 'Vue':
        return 'rgba(66, 184, 131, 0.6)';
      case 'Swift':
        return 'rgba(255, 122, 69, 0.6)';
      default:
        return 'rgba(155, 135, 245, 0.6)';
    }
  };

  const glowColor = getGlowColor(name);

  return (
    <div className="group relative">
      <div className="flex items-center gap-4 mb-2">
        {logo && (
          <div className="relative">
            <img 
              src={logo} 
              alt={name} 
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110" 
              style={{
                filter: `drop-shadow(0 0 8px ${glowColor})`,
              }}
            />
          </div>
        )}
        <span className="text-sm">{name}</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-progress opacity-0 group-hover:opacity-100"
          style={{ 
            width: `${percentage}%`,
            boxShadow: `0 0 10px ${glowColor}`,
            background: `linear-gradient(90deg, ${glowColor}, ${glowColor.replace('0.6', '0.8')})`,
          }}
        />
      </div>
      <span className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
        {percentage}%
      </span>
    </div>
  );
};