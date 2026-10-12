import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadIcon,
  FileUploadTitle,
  FileUploadHint,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
} from './index';

const meta = {
  title: 'Formularios/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-[450px]">
        <FileUpload
          multiple
          accept="image/*,.pdf"
          maxSize={5 * 1024 * 1024}
          onChange={setFiles}
        >
          <FileUploadDropzone>
            <FileUploadIcon />
            <FileUploadTitle>Subir archivos</FileUploadTitle>
            <FileUploadHint>PNG, JPG o PDF hasta 5MB</FileUploadHint>
          </FileUploadDropzone>
          {files.length > 0 && (
            <FileUploadList>
              {files.map((file, idx) => (
                <FileUploadItem
                  key={idx}
                  file={file}
                  status="success"
                  onRemove={() => setFiles(files.filter((_, i) => i !== idx))}
                />
              ))}
            </FileUploadList>
          )}
        </FileUpload>
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => (
    <div className="w-[400px]">
      <FileUpload size="sm">
        <FileUploadDropzone variant="compact" size="sm">
          <FileUploadIcon size="sm" />
          <FileUploadTitle className="text-xs">Subir comprobante</FileUploadTitle>
          <FileUploadHint>PDF o imagen hasta 2MB</FileUploadHint>
        </FileUploadDropzone>
      </FileUpload>
    </div>
  ),
};

export const CardVariant: Story = {
  render: () => (
    <div className="w-[450px]">
      <FileUpload shape="squircle">
        <FileUploadDropzone variant="card" shape="squircle">
          <FileUploadIcon shape="squircle" />
          <FileUploadTitle>Documentación de Soporte</FileUploadTitle>
          <FileUploadHint>Adjuntá expedientes digitales en formato PDF</FileUploadHint>
          <FileUploadTrigger className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-alcspower-primary text-white">
            Examinar archivos
          </FileUploadTrigger>
        </FileUploadDropzone>
      </FileUpload>
    </div>
  ),
};
