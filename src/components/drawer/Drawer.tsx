import * as React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '../sheet';
import { cn } from '../../lib/utils';

export interface DrawerProps extends React.ComponentPropsWithoutRef<typeof Sheet> {}

const Drawer = ({ ...props }: DrawerProps) => <Sheet {...props} />;
Drawer.displayName = 'Drawer';

const DrawerTrigger = SheetTrigger;
DrawerTrigger.displayName = 'DrawerTrigger';

const DrawerClose = SheetClose;
DrawerClose.displayName = 'DrawerClose';

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetContent> {
  /**
   * Si es true, oculta el tirador visual superior
   */
  hideHandle?: boolean;
}

const DrawerHandle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mx-auto mb-4 h-1.5 w-12 rounded-full bg-alcspower-border transition-colors hover:bg-alcspower-text-muted',
      className
    )}
    aria-hidden="true"
    {...props}
  />
);
DrawerHandle.displayName = 'DrawerHandle';

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof SheetContent>,
  DrawerContentProps
>(({ className, children, hideHandle = false, ...props }, ref) => (
  <SheetContent
    ref={ref}
    side="bottom"
    className={cn(
      'max-h-[85vh] rounded-t-2xl border-t border-x-0 border-b-0 px-6 pt-3 pb-8 overflow-y-auto',
      className
    )}
    {...props}
  >
    {!hideHandle && <DrawerHandle />}
    {children}
  </SheetContent>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <SheetHeader className={cn('text-center sm:text-center mb-4', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <SheetFooter
    className={cn('sm:justify-center flex-col sm:flex-col gap-2 mt-6', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = SheetTitle;
const DrawerDescription = SheetDescription;

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerHandle,
};
