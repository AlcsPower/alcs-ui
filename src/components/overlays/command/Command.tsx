import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../dialog';
import { VisuallyHidden } from '../../accessibility/visually-hidden';

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-2xl border border-alcspower-border/70 bg-alcspower-surface text-alcspower-foreground shadow-sm transition-all',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

export const CommandFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-alcspower-border/60 bg-alcspower-surface-muted/30 px-4 py-2.5 text-xs text-alcspower-muted-foreground select-none',
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-xs font-semibold text-alcspower-foreground shadow-2xs">
                ↑↓
              </kbd>
              navegar
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-xs font-semibold text-alcspower-foreground shadow-2xs">
                ↵
              </kbd>
              seleccionar
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-alcspower-border/70 bg-alcspower-surface font-mono text-xs font-semibold text-alcspower-foreground shadow-2xs">
                esc
              </kbd>
              cerrar
            </span>
          </div>
          <span className="text-xs text-alcspower-muted-foreground/70 hidden sm:inline">
            Motor cmdk · fuzzy filter
          </span>
        </>
      )}
    </div>
  );
};
CommandFooter.displayName = 'CommandFooter';

export interface CommandDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title?: string;
  description?: string;
  showFooter?: boolean;
}

export const CommandDialog = ({
  children,
  title = 'Paleta de Comandos',
  description = 'Buscador y paleta de comandos interactiva',
  showFooter = true,
  ...props
}: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl border border-alcspower-border/80 max-w-xl rounded-2xl sm:rounded-3xl bg-alcspower-surface [&>button:last-child]:hidden">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden>
        <Command className="border-0 shadow-none rounded-none bg-transparent">
          {children}
        </Command>
        {showFooter && <CommandFooter />}
      </DialogContent>
    </Dialog>
  );
};

export interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  shortcut?: React.ReactNode;
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, shortcut = '⌘K', ...props }, ref) => (
  <div
    className="flex items-center gap-3 border-b border-alcspower-border/60 px-6 py-3 transition-colors focus-within:border-alcspower-primary/60 group"
    cmdk-input-wrapper=""
  >
    <Search className="h-4.5 w-4.5 shrink-0 text-alcspower-muted-foreground/60 transition-colors group-focus-within:text-alcspower-primary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-7 w-full bg-transparent text-sm font-medium outline-none placeholder:text-alcspower-muted-foreground/50 text-alcspower-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 p-0 focus:ring-0 focus:outline-none',
        className
      )}
      {...props}
    />
    {shortcut && (
      <kbd className="inline-flex items-center justify-center gap-1 h-6 min-w-[28px] px-2 rounded-md border border-alcspower-border bg-alcspower-surface-muted text-xs font-mono font-semibold text-alcspower-foreground shrink-0 select-none shadow-2xs">
        {shortcut}
      </kbd>
    )}
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[340px] overflow-y-auto overflow-x-hidden p-2 space-y-1',
      '[scrollbar-width:thin] [scrollbar-color:var(--color-alcspower-border)_transparent]',
      '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-alcspower-border/70 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-alcspower-border',
      className
    )}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

export interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {
  icon?: React.ReactNode;
  hint?: string;
}

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(
  (
    {
      className,
      children = 'No se encontraron resultados',
      icon,
      hint = 'Intentá con otros términos de búsqueda',
      ...props
    },
    ref
  ) => (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn(
        'py-8 px-4 text-center text-sm text-alcspower-muted-foreground flex flex-col items-center justify-center gap-1.5',
        className
      )}
      {...props}
    >
      {icon ?? <Search className="h-6 w-6 opacity-35 mb-1 text-alcspower-muted-foreground" />}
      <div className="font-medium text-alcspower-foreground/80">{children}</div>
      {hint && <div className="text-xs text-alcspower-muted-foreground/70">{hint}</div>}
    </CommandPrimitive.Empty>
  )
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-alcspower-foreground mb-1 last:mb-0',
      '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-alcspower-muted-foreground [&_[cmdk-group-heading]]:select-none',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1.5 h-px bg-alcspower-border/60', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItemIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
      'bg-alcspower-surface-muted/80 text-alcspower-muted-foreground',
      'group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-white',
      className
    )}
    {...props}
  />
);
CommandItemIcon.displayName = 'CommandItemIcon';

export const CommandItemContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 min-w-0 text-left', className)} {...props} />
);
CommandItemContent.displayName = 'CommandItemContent';

export const CommandItemTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'text-sm font-medium leading-tight truncate text-alcspower-foreground',
      'group-data-[selected=true]:text-white',
      className
    )}
    {...props}
  />
);
CommandItemTitle.displayName = 'CommandItemTitle';

export const CommandItemDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'text-xs text-alcspower-muted-foreground leading-normal mt-0.5 truncate',
      'group-data-[selected=true]:text-white/80',
      className
    )}
    {...props}
  />
);
CommandItemDescription.displayName = 'CommandItemDescription';

export interface CommandItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, 'title'> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  shortcut?: React.ReactNode;
}

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, children, icon, title, description, shortcut, ...props }, ref) => {
  const hasStructuredProps = Boolean(icon || title || description || shortcut);

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none text-alcspower-foreground',
        'data-[selected=true]:bg-alcspower-primary data-[selected=true]:text-white data-[selected=true]:shadow-md data-[selected=true]:shadow-alcspower-primary/25',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40',
        className
      )}
      {...props}
    >
      {hasStructuredProps ? (
        <>
          {icon && <CommandItemIcon>{icon}</CommandItemIcon>}
          <CommandItemContent>
            {title && <CommandItemTitle>{title}</CommandItemTitle>}
            {description && <CommandItemDescription>{description}</CommandItemDescription>}
            {children}
          </CommandItemContent>
          {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
        </>
      ) : (
        children
      )}
    </CommandPrimitive.Item>
  );
});
CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <kbd
      className={cn(
        'ml-auto inline-flex items-center justify-center gap-1 h-6 min-w-[28px] px-2 rounded-md font-mono text-xs font-semibold tracking-normal select-none shrink-0',
        'bg-alcspower-surface-muted border border-alcspower-border text-alcspower-foreground shadow-2xs',
        'group-data-[selected=true]:bg-white/25 group-data-[selected=true]:border-white/40 group-data-[selected=true]:text-white',
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';
