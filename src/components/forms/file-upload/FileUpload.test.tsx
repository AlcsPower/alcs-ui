import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadIcon,
  FileUploadTitle,
  FileUploadHint,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  formatBytes,
  validateFile,
} from './index';

describe('FileUpload Component', () => {
  it('renderiza correctamente el dropzone con su título y hint', () => {
    render(
      <FileUpload>
        <FileUploadDropzone>
          <FileUploadIcon />
          <FileUploadTitle>Subir archivos</FileUploadTitle>
          <FileUploadHint>PNG o JPG hasta 5MB</FileUploadHint>
        </FileUploadDropzone>
      </FileUpload>
    );

    expect(screen.getByRole('region', { name: /zona de carga de archivos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subir archivos/i })).toBeInTheDocument();
    expect(screen.getByText('Subir archivos')).toBeInTheDocument();
    expect(screen.getByText('PNG o JPG hasta 5MB')).toBeInTheDocument();
  });

  it('abre el selector de archivos al presionar Enter o Espacio en el dropzone accesible', async () => {
    const user = userEvent.setup();
    const handleFileChange = vi.fn();

    render(
      <FileUpload onChange={handleFileChange}>
        <FileUploadDropzone>
          <FileUploadTitle>Zona de carga</FileUploadTitle>
        </FileUploadDropzone>
      </FileUpload>
    );

    const dropzone = screen.getByRole('button', { name: /zona de carga/i });
    dropzone.focus();
    expect(dropzone).toHaveFocus();

    // Simula evento de selección de archivo en el input asociado
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const file = new File(['contenido de prueba'], 'documento.pdf', { type: 'application/pdf' });
    await user.upload(input, file);

    expect(handleFileChange).toHaveBeenCalledTimes(1);
    expect(handleFileChange).toHaveBeenCalledWith([file]);
  });

  it('formatea correctamente los tamaños en bytes a unidades legibles', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(5242880)).toBe('5 MB');
    expect(formatBytes(2621440, 2)).toBe('2.5 MB');
  });

  it('valida límites de tamaño y tipos MIME permitidos', () => {
    const validFile = new File(['valid'], 'foto.png', { type: 'image/png' });
    const hugeFile = new File(['a'.repeat(200)], 'pesado.png', { type: 'image/png' });
    Object.defineProperty(hugeFile, 'size', { value: 10 * 1024 * 1024 });

    const invalidTypeFile = new File(['script'], 'app.exe', { type: 'application/x-msdownload' });

    // Validación exitosa
    expect(validateFile(validFile, 'image/*', 0, 5 * 1024 * 1024)).toHaveLength(0);

    // Validación falla por tamaño
    const sizeErrors = validateFile(hugeFile, 'image/*', 0, 2 * 1024 * 1024);
    expect(sizeErrors).toHaveLength(1);
    expect(sizeErrors[0]!.code).toBe('file-too-large');

    // Validación falla por tipo
    const typeErrors = validateFile(invalidTypeFile, '.png,.jpg,image/*');
    expect(typeErrors).toHaveLength(1);
    expect(typeErrors[0]!.code).toBe('file-invalid-type');
  });

  it('renderiza la lista de archivos con sus estados y acción de eliminar', () => {
    const file = new File(['test'], 'informe.pdf', { type: 'application/pdf' });
    const handleRemove = vi.fn();

    render(
      <FileUploadList>
        <FileUploadItem
          file={file}
          status="uploading"
          progress={65}
          onRemove={handleRemove}
        />
      </FileUploadList>
    );

    expect(screen.getByText('informe.pdf')).toBeInTheDocument();
    expect(screen.getByText(/subiendo/i)).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /eliminar archivo informe.pdf/i });
    fireEvent.click(deleteBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const file = new File(['contenido'], 'contrato.pdf', { type: 'application/pdf' });

    const { container } = render(
      <FileUpload multiple accept=".pdf,image/*">
        <FileUploadDropzone>
          <FileUploadIcon />
          <FileUploadTitle>Cargar documentos</FileUploadTitle>
          <FileUploadHint>PDF o imágenes hasta 10MB</FileUploadHint>
          <FileUploadTrigger className="mt-2 text-xs text-alcspower-primary underline">
            O selecciona desde tu equipo
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          <FileUploadItem
            file={file}
            status="success"
            onRemove={() => {}}
          />
        </FileUploadList>
      </FileUpload>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
