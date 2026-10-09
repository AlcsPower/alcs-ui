import type { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationInfo,
} from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navegación/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>7</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <PaginationInfo currentPage={2} totalPages={7} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-semibold text-alcspower-muted-foreground uppercase tracking-wider">
          Small (sm)
        </p>
        <Pagination size="sm">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>7</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <PaginationInfo currentPage={1} totalPages={7} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-semibold text-alcspower-muted-foreground uppercase tracking-wider">
          Medium (md - default)
        </p>
        <Pagination size="md">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>7</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <PaginationInfo currentPage={2} totalPages={7} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-semibold text-alcspower-muted-foreground uppercase tracking-wider">
          Large (lg) con navegación rápida
        </p>
        <Pagination size="lg">
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <PaginationInfo currentPage={3} totalPages={10} totalResults={100} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-alcspower-muted-foreground">Outlined (default)</span>
        <Pagination variant="default">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink>7</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-alcspower-muted-foreground">Filled</span>
        <Pagination variant="filled">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink>7</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-alcspower-muted-foreground">Minimal</span>
        <Pagination variant="minimal">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink>7</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-emerald-600 font-semibold">Success</span>
        <Pagination color="success">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-amber-600 font-semibold">Warning</span>
        <Pagination color="warning">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-red-600 font-semibold">Error / Destructive</span>
        <Pagination color="error">
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};
