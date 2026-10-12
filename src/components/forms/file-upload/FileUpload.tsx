import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  UploadCloud,
  File as FileIcon,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  FileArchive,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Progress } from '../../feedback/progress';

// ==========================================
// Tipos y Modelos
// ==========================================

export type FileUploadSize = 'sm' | 'md' | 'lg';
export type FileUploadShape = 'circle' | 'squircle' | 'rounded';
export type FileUploadVariant = 'default' | 'card' | 'compact' | 'button';

export type FileRejectionReason =
  | 'file-too-large'
  | 'file-too-small'
  | 'file-invalid-type'
  | 'too-many-files';

export interface FileRejectionError {
  code: FileRejectionReason;
  message: string;
}

export interface FileRejection {
  file: File;
  errors: FileRejectionError[];
}

export interface UploadedFileItem {
  id?: string;
  file: File;
  progress?: number;
  status?: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
  previewUrl?: string;
}

// ==========================================
// Contexto de FileUpload
// ==========================================

interface FileUploadContextValue {
  isDragging: boolean;
  disabled: boolean;
  size: FileUploadSize;
  shape: FileUploadShape;
  variant: FileUploadVariant;
  openFileDialog: () => void;
  inputId: string;
  multiple: boolean;
  accept?: string;
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

export function useFileUploadContext(): FileUploadContextValue {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error('Los subcomponentes de FileUpload deben usarse dentro de <FileUpload>');
  }
  return context;
}

// ==========================================
// Utilidades de Archivo
// ==========================================

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileCategoryIcon(file: File) {
  const type = file.type;
  const name = file.name.toLowerCase();

  if (type.startsWith('image/')) return <FileImage className="h-5 w-5 text-indigo-500 shrink-0" />;
  if (type.startsWith('video/')) return <FileVideo className="h-5 w-5 text-purple-500 shrink-0" />;
  if (type.startsWith('audio/')) return <FileAudio className="h-5 w-5 text-amber-500 shrink-0" />;
  if (type === 'application/pdf' || name.endsWith('.pdf'))
    return <FileText className="h-5 w-5 text-red-500 shrink-0" />;
  if (
    type.includes('zip') ||
    type.includes('tar') ||
    type.includes('rar') ||
    name.endsWith('.zip') ||
    name.endsWith('.rar') ||
    name.endsWith('.7z')
  )
    return <FileArchive className="h-5 w-5 text-amber-600 shrink-0" />;
  if (
    type.includes('javascript') ||
    type.includes('typescript') ||
    type.includes('json') ||
    type.includes('html') ||
    name.endsWith('.ts') ||
    name.endsWith('.tsx') ||
    name.endsWith('.js')
  )
    return <FileCode className="h-5 w-5 text-sky-500 shrink-0" />;

  return <FileIcon className="h-5 w-5 text-alcspower-muted-foreground shrink-0" />;
}

export function validateFile(
  file: File,
  accept?: string,
  minSize?: number,
  maxSize?: number
): FileRejectionError[] {
  const errors: FileRejectionError[] = [];

  if (maxSize && file.size > maxSize) {
    errors.push({
      code: 'file-too-large',
      message: `El archivo supera el tamaño máximo permitido de ${formatBytes(maxSize)}.`,
    });
  }

  if (minSize && file.size < minSize) {
    errors.push({
      code: 'file-too-small',
      message: `El archivo es inferior al tamaño mínimo requerido de ${formatBytes(minSize)}.`,
    });
  }

  if (accept) {
    const acceptedPatterns = accept.split(',').map((p) => p.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    const matches = acceptedPatterns.some((pattern) => {
      if (pattern.startsWith('.')) {
        return fileName.endsWith(pattern);
      }
      if (pattern.endsWith('/*')) {
        const prefix = pattern.replace('/*', '');
        return fileType.startsWith(prefix);
      }
      return fileType === pattern;
    });

    if (!matches) {
      errors.push({
        code: 'file-invalid-type',
        message: `Tipo de archivo no permitido. Tipos aceptados: ${accept}`,
      });
    }
  }

  return errors;
}

// ==========================================
// Variantes CVA
// ==========================================

export const fileUploadDropzoneVariants = cva(
  'relative flex flex-col items-center justify-center text-center transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-alcspower-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-2 border-dashed border-alcspower-border hover:border-alcspower-primary/60 bg-alcspower-surface hover:bg-alcspower-surface-muted/30 shadow-2xs',
        card:
          'border border-solid border-alcspower-border bg-alcspower-surface p-6 shadow-xs hover:border-alcspower-primary/50',
        compact:
          'border border-dashed border-alcspower-border hover:border-alcspower-primary bg-alcspower-surface-muted/20 hover:bg-alcspower-surface-muted/40 p-4',
        button:
          'inline-flex flex-row gap-2 items-center justify-center border border-solid border-alcspower-border bg-alcspower-surface hover:bg-alcspower-surface-muted px-4 py-2 font-medium text-sm',
      },
      size: {
        sm: 'p-4 min-h-[140px] text-xs',
        md: 'p-7 min-h-[200px] text-sm',
        lg: 'p-10 min-h-[260px] text-base',
      },
      shape: {
        circle: 'rounded-full',
        squircle: 'rounded-3xl',
        rounded: 'rounded-xl',
      },
      isDragging: {
        true: 'border-alcspower-primary bg-alcspower-primary/5 ring-4 ring-alcspower-primary/10 scale-[1.008]',
        false: '',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none cursor-not-allowed bg-alcspower-surface-muted/40 border-alcspower-border',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rounded',
      isDragging: false,
      disabled: false,
    },
  }
);

export const fileUploadIconVariants = cva(
  'relative flex items-center justify-center shrink-0 transition-transform duration-200 mb-3',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
        md: 'h-14 w-14 [&>svg]:h-7 [&>svg]:w-7',
        lg: 'h-18 w-18 [&>svg]:h-9 [&>svg]:w-9',
      },
      shape: {
        circle: 'rounded-full',
        squircle: 'rounded-2xl',
        rounded: 'rounded-xl',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'squircle',
    },
  }
);

// ==========================================
// FileUpload Root
// ==========================================

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  onFileReject?: (rejections: FileRejection[]) => void;
  accept?: string;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  size?: FileUploadSize;
  shape?: FileUploadShape;
  variant?: FileUploadVariant;
  id?: string;
  name?: string;
}

/**
 * Contenedor raíz para carga de archivos con soporte para drag & drop,
 * validación de tamaño/tipo MIME y navegación por teclado accesible.
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      onFileReject,
      accept,
      minSize,
      maxSize,
      maxFiles,
      multiple = false,
      disabled = false,
      size = 'md',
      shape = 'rounded',
      variant = 'default',
      id: explicitId,
      name,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = explicitId || `file-upload-${generatedId}`;
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const [isControlled] = React.useState(value !== undefined);
    const [internalFiles, setInternalFiles] = React.useState<File[]>(defaultValue);
    const files = isControlled ? value || [] : internalFiles;

    const [isDragging, setIsDragging] = React.useState(false);
    const dragCounterRef = React.useRef(0);

    const openFileDialog = React.useCallback(() => {
      if (!disabled && inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.click();
      }
    }, [disabled]);

    const processFiles = React.useCallback(
      (newFilesList: FileList | File[]) => {
        if (disabled) return;
        const incoming = Array.from(newFilesList);
        const valid: File[] = [];
        const rejections: FileRejection[] = [];

        for (const file of incoming) {
          const errors = validateFile(file, accept, minSize, maxSize);
          if (errors.length > 0) {
            rejections.push({ file, errors });
          } else {
            valid.push(file);
          }
        }

        // Límite de cantidad de archivos si maxFiles está definido
        let finalToAdd = valid;
        if (maxFiles !== undefined) {
          const currentCount = multiple ? files.length : 0;
          const availableSlots = Math.max(0, maxFiles - currentCount);
          if (valid.length > availableSlots) {
            const overflow = valid.slice(availableSlots);
            for (const file of overflow) {
              rejections.push({
                file,
                errors: [
                  {
                    code: 'too-many-files',
                    message: `Límite máximo de ${maxFiles} archivo(s) alcanzado.`,
                  },
                ],
              });
            }
            finalToAdd = valid.slice(0, availableSlots);
          }
        }

        if (rejections.length > 0 && onFileReject) {
          onFileReject(rejections);
        }

        if (finalToAdd.length > 0) {
          const nextFiles: File[] = multiple ? [...files, ...finalToAdd] : finalToAdd.slice(0, 1);
          if (!isControlled) {
            setInternalFiles(nextFiles);
          }
          onChange?.(nextFiles);
        }
      },
      [disabled, accept, minSize, maxSize, maxFiles, multiple, files, isControlled, onChange, onFileReject]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounterRef.current += 1;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounterRef.current -= 1;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);
      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    const contextValue = React.useMemo<FileUploadContextValue>(
      () => ({
        isDragging,
        disabled,
        size,
        shape,
        variant,
        openFileDialog,
        inputId,
        multiple,
        accept,
      }),
      [isDragging, disabled, size, shape, variant, openFileDialog, inputId, multiple, accept]
    );

    return (
      <FileUploadContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="region"
          aria-label="Zona de carga de archivos"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn('relative flex flex-col w-full gap-3', className)}
          {...props}
        >
          <input
            ref={inputRef}
            id={inputId}
            name={name}
            type="file"
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
          />
          {children}
        </div>
      </FileUploadContext.Provider>
    );
  }
);
FileUpload.displayName = 'FileUpload';

// ==========================================
// FileUploadDropzone
// ==========================================

export interface FileUploadDropzoneProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileUploadDropzoneVariants> {}

/**
 * Área visual e interactiva que recibe arrastre de archivos o clicks del usuario.
 */
export const FileUploadDropzone = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (
    {
      variant: explicitVariant,
      size: explicitSize,
      shape: explicitShape,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { isDragging, disabled, size, shape, variant, openFileDialog, inputId } =
      useFileUploadContext();

    const finalVariant = explicitVariant ?? variant;
    const finalSize = explicitSize ?? size;
    const finalShape = explicitShape ?? shape;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        openFileDialog();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (!e.defaultPrevented && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openFileDialog();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-controls={inputId}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          fileUploadDropzoneVariants({
            variant: finalVariant,
            size: finalSize,
            shape: finalShape,
            isDragging,
            disabled,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FileUploadDropzone.displayName = 'FileUploadDropzone';

// ==========================================
// FileUploadIcon
// ==========================================

export interface FileUploadIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileUploadIconVariants> {
  icon?: React.ReactNode;
}

export const FileUploadIcon = React.forwardRef<HTMLDivElement, FileUploadIconProps>(
  ({ icon, size: explicitSize, shape: explicitShape, className, ...props }, ref) => {
    const { size, shape, isDragging } = useFileUploadContext();
    const finalSize = explicitSize ?? size;
    const finalShape = explicitShape ?? shape;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          fileUploadIconVariants({ size: finalSize, shape: finalShape }),
          'border border-alcspower-primary/20 bg-alcspower-primary/10 text-alcspower-primary shadow-xs',
          isDragging && 'scale-110 bg-alcspower-primary/20 text-alcspower-primary-hover',
          className
        )}
        {...props}
      >
        {icon ?? <UploadCloud />}
      </div>
    );
  }
);
FileUploadIcon.displayName = 'FileUploadIcon';

// ==========================================
// FileUploadTitle
// ==========================================

export interface FileUploadTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FileUploadTitle = React.forwardRef<HTMLParagraphElement, FileUploadTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'font-semibold text-alcspower-foreground tracking-tight',
          className
        )}
        {...props}
      >
        {children ?? 'Arrastrá tus archivos aquí o hacé clic para explorar'}
      </p>
    );
  }
);
FileUploadTitle.displayName = 'FileUploadTitle';

// ==========================================
// FileUploadHint / Description
// ==========================================

export interface FileUploadHintProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FileUploadHint = React.forwardRef<HTMLParagraphElement, FileUploadHintProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-xs text-alcspower-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FileUploadHint.displayName = 'FileUploadHint';

// ==========================================
// FileUploadTrigger
// ==========================================

export interface FileUploadTriggerProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'button' | 'span';
}

export const FileUploadTrigger = React.forwardRef<HTMLElement, FileUploadTriggerProps>(
  ({ as: Component = 'span', className, children, onClick, ...props }, ref) => {
    const { openFileDialog } = useFileUploadContext();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        openFileDialog();
      }
    };

    return (
      <Component
        ref={ref as React.Ref<any>}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        {children ?? 'Seleccionar archivos'}
      </Component>
    );
  }
);
FileUploadTrigger.displayName = 'FileUploadTrigger';

// ==========================================
// FileUploadList
// ==========================================

export interface FileUploadListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const FileUploadList = React.forwardRef<HTMLUListElement, FileUploadListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        role="list"
        aria-label="Archivos seleccionados"
        className={cn('flex flex-col gap-2.5 w-full mt-2', className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
FileUploadList.displayName = 'FileUploadList';

// ==========================================
// FileUploadItem
// ==========================================

export interface FileUploadItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  file: File;
  progress?: number;
  status?: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
  previewUrl?: string;
  thumbnail?: React.ReactNode;
  onRemove?: () => void;
  onRetry?: () => void;
}

export const FileUploadItem = React.forwardRef<HTMLLIElement, FileUploadItemProps>(
  (
    {
      file,
      progress,
      status = 'idle',
      errorMessage,
      previewUrl,
      thumbnail,
      onRemove,
      onRetry,
      className,
      ...props
    },
    ref
  ) => {
    const isImage = file.type.startsWith('image/');
    const [localPreview, setLocalPreview] = React.useState<string | undefined>(previewUrl);
    const [hasImgError, setHasImgError] = React.useState(false);

    React.useEffect(() => {
      setHasImgError(false);
      if (previewUrl) {
        setLocalPreview(previewUrl);
        return undefined;
      }
      if (isImage) {
        const url = URL.createObjectURL(file);
        setLocalPreview(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      }
      return undefined;
    }, [file, isImage, previewUrl]);

    return (
      <li
        ref={ref}
        role="listitem"
        className={cn(
          'group relative flex items-center gap-3 p-3 rounded-xl border border-alcspower-border bg-alcspower-surface shadow-2xs transition-all hover:border-alcspower-primary/30',
          status === 'error' && 'border-alcspower-destructive/40 bg-alcspower-destructive/5',
          status === 'success' && 'border-emerald-500/30',
          className
        )}
        {...props}
      >
        {/* Thumbnail o Icono */}
        <div className="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-lg bg-alcspower-surface-muted/60 border border-alcspower-border-subtle overflow-hidden">
          {thumbnail ? (
            thumbnail
          ) : localPreview && !hasImgError ? (
            <img
              src={localPreview}
              alt={file.name}
              className="h-full w-full object-cover"
              onError={() => setHasImgError(true)}
            />
          ) : (
            getFileCategoryIcon(file)
          )}
        </div>

        {/* Metadatos y Barra de Progreso */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-xs font-semibold text-alcspower-foreground truncate"
              title={file.name}
            >
              {file.name}
            </span>
            <span className="text-[11px] font-mono text-alcspower-muted-foreground shrink-0 tabular-nums">
              {formatBytes(file.size)}
            </span>
          </div>

          {/* Barra de progreso si está subiendo */}
          {status === 'uploading' && (
            <div className="mt-1.5 w-full space-y-1">
              <div className="flex justify-between items-center text-[10px] text-alcspower-muted-foreground font-medium">
                <span>Subiendo...</span>
                <span>{progress ?? 0}%</span>
              </div>
              <Progress value={progress ?? 0} size="sm" />
            </div>
          )}

          {/* Mensaje de error */}
          {status === 'error' && errorMessage && (
            <div className="flex items-center gap-1 mt-1 text-[11px] text-alcspower-destructive font-medium">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{errorMessage}</span>
            </div>
          )}

          {/* Mensaje de éxito */}
          {status === 'success' && (
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Carga completada</span>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-1 shrink-0">
          {status === 'error' && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              aria-label={`Reintentar carga de ${file.name}`}
              className="p-1.5 text-alcspower-muted-foreground hover:text-alcspower-primary hover:bg-alcspower-surface-muted rounded-md transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Eliminar archivo ${file.name}`}
              className="p-1.5 text-alcspower-muted-foreground hover:text-alcspower-destructive hover:bg-alcspower-destructive/10 rounded-md transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </li>
    );
  }
);
FileUploadItem.displayName = 'FileUploadItem';
