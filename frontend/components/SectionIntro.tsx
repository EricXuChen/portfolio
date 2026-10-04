type Props = {
  kicker?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionIntro({ kicker, title, description, action }: Props) {
  return (
    <div className="section-head">
      <div className="section-head__text">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-desc">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
