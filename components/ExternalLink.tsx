import cn from 'classnames';

export const ExternalLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    className={cn('transition', className)}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);
