"use client";

import { FormEvent, type ReactNode, useMemo, useState, useTransition } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteAdminRecord, saveAdminRecord } from "@/app/actions/admin-crud";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminModules, type AdminField, type AdminModuleKey } from "@/lib/admin-config";
import { cn } from "@/lib/utils";
import { ImageUploadField } from "./ImageUploadField";

type AdminRow = Record<string, unknown> & { id?: string };

export type AdminColumn = {
  key: string;
  label: string;
  render?: (row: AdminRow) => ReactNode;
};

export function AdminCrudPanel({
  moduleKey,
  rows,
  columns,
  title,
  description,
  className,
}: {
  moduleKey: AdminModuleKey;
  rows: AdminRow[];
  columns: AdminColumn[];
  title?: string;
  description?: string;
  className?: string;
}) {
  const moduleConfig = adminModules[moduleKey];
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminRow | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(() => {
    return Object.fromEntries(moduleConfig.fields.map((field) => [field.name, defaultValue(field)]));
  }, [moduleConfig.fields]);

  function openAdd() {
    setEditing(null);
    setFormValues(initialValues);
    setMessage("");
    setError("");
    setOpen(true);
  }

  function openEdit(row: AdminRow) {
    setEditing(row);
    setFormValues(
      Object.fromEntries(
        moduleConfig.fields.map((field) => {
          const value = row[field.name];
          if (field.type === "tags" || field.type === "images") {
            return [field.name, Array.isArray(value) ? value.join(", ") : String(value ?? "")];
          }
          if (field.type === "boolean") {
            return [field.name, Boolean(value)];
          }
          return [field.name, value ?? defaultValue(field)];
        }),
      ),
    );
    setMessage("");
    setError("");
    setOpen(true);
  }

  function updateValue(name: string, value: unknown) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const missing = moduleConfig.fields.find((field) => field.required && !String(formValues[field.name] ?? "").trim());
    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }

    startTransition(async () => {
      const result = await saveAdminRecord(moduleKey, {
        ...(editing?.id ? { id: editing.id } : {}),
        ...formValues,
      });
      if (result.ok) {
        setMessage(result.message);
        setOpen(false);
      } else {
        setError(result.message);
      }
    });
  }

  function remove(row: AdminRow) {
    if (!row.id) {
      setError("This record cannot be deleted because it does not have a database id.");
      return;
    }

    if (!window.confirm(`Delete this ${moduleConfig.title.toLowerCase()}?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteAdminRecord(moduleKey, row.id as string);
      if (result.ok) {
        setMessage(result.message);
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <section className={cn("mt-8 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0b]", className)}>
      <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-normal text-white">{title ?? `${moduleConfig.title} management`}</h2>
          {description ? <p className="mt-1 max-w-2xl text-sm text-white/45">{description}</p> : null}
          {message ? <p className="mt-2 text-sm text-white/65">{message}</p> : null}
          {error ? <p className="mt-2 text-sm text-white/65">{error}</p> : null}
        </div>
        <Button className="rounded-full" onClick={openAdd} disabled={isPending}>
          <Plus className="h-4 w-4" />
          {moduleConfig.addLabel}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/40">
            <tr>
              {columns.map((column) => (
                <th className="px-4 py-3 font-medium" key={column.key}>
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-white/40" colSpan={columns.length + 1}>
                  No records yet. Use {moduleConfig.addLabel} to create the first one.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr className="border-b border-white/5 text-white/62" key={row.id ?? rowIndex}>
                  {columns.map((column) => (
                    <td className="max-w-[280px] px-4 py-3 align-top" key={column.key}>
                      {column.render ? column.render(row) : formatCell(row[column.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(row)}
                        disabled={isPending}
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(row)}
                        disabled={isPending || !row.id}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0b0b0b] text-white sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${moduleConfig.title}` : moduleConfig.addLabel}</DialogTitle>
            <DialogDescription className="text-white/45">
              Changes are saved to Supabase and refreshed across the admin panel.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-4 md:grid-cols-2">
              {moduleConfig.fields.map((field) => (
                <FieldInput
                  field={field}
                  key={field.name}
                  value={formValues[field.name]}
                  onChange={(value) => updateValue(field.name, value)}
                />
              ))}
            </div>
            {error ? <p className="text-sm text-white/65">{error}</p> : null}
            <div className="flex flex-col-reverse gap-2 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: AdminField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const fieldId = `admin-field-${field.name}`;
  const wide = field.type === "textarea" || field.type === "image" || field.type === "images";

  return (
    <div className={cn("space-y-2", wide && "md:col-span-2")}>
      <Label className="text-xs uppercase tracking-[0.2em] text-white/42" htmlFor={fieldId}>
        {field.label}
      </Label>
      {renderInput(field, fieldId, value, onChange)}
    </div>
  );
}

function renderInput(
  field: AdminField,
  fieldId: string,
  value: unknown,
  onChange: (value: unknown) => void,
) {
  if (field.type === "textarea") {
    return (
      <Textarea
        id={fieldId}
        className="min-h-28 bg-black text-white"
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={fieldId}
        className="h-10 w-full rounded-md border border-white/10 bg-black px-3 text-sm text-white outline-none"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select {field.label}</option>
        {field.options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex h-10 items-center gap-3 rounded-md border border-white/10 bg-black px-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        Enabled
      </label>
    );
  }

  if (field.type === "image" || field.type === "images") {
    return (
      <ImageUploadField
        value={field.type === "images" ? String(value ?? "").split(",").filter(Boolean) : String(value ?? "")}
        onChange={(nextValue) => onChange(Array.isArray(nextValue) ? nextValue.join(", ") : nextValue)}
        folder={field.uploadFolder}
        multiple={field.type === "images"}
      />
    );
  }

  return (
    <Input
      id={fieldId}
      className="bg-black text-white"
      type={field.type === "tags" ? "text" : field.type}
      placeholder={field.placeholder ?? (field.type === "tags" ? "Separate values with commas" : undefined)}
      value={String(value ?? "")}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function defaultValue(field: AdminField) {
  if (field.type === "boolean") return false;
  return "";
}

function formatCell(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
