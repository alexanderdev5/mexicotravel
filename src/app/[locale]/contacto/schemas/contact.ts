import { z } from 'zod';

// Interface para los mensajes de validación
export interface ContactValidationMessages {
  name: {
    min: string;
    max: string;
    invalid: string;
  };
  email: {
    invalid: string;
    min: string;
    max: string;
  };
  phone: {
    invalid: string;
  };
  company: {
    max: string;
  };
  subject: {
    required: string;
    max: string;
  };
  message: {
    min: string;
    max: string;
    invalid: string;
  };
}

// Función que crea el schema con mensajes dinámicos
export const createContactSchema = (messages: ContactValidationMessages) => {
  return z.object({
    name: z.string()
      .min(2, messages.name.min)
      .max(50, messages.name.max)
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, messages.name.invalid),
    
    email: z.string()
      .email(messages.email.invalid)
      .min(5, messages.email.min)
      .max(100, messages.email.max),
    
    phone: z.string()
      .regex(/^[\+]?[0-9\s\-\(\)]{10,}$/, messages.phone.invalid)
      .optional()
      .or(z.literal('')),
    
    company: z.string()
      .max(50, messages.company.max)
      .optional()
      .or(z.literal('')),
    
    subject: z.string()
      .min(1, messages.subject.required)
      .max(100, messages.subject.max),
    
    message: z.string()
      .min(10, messages.message.min)
      .max(1000, messages.message.max)
      .regex(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/, messages.message.invalid)
  });
};

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

// Schema por defecto (para compatibilidad)
export const contactSchema = createContactSchema({
  name: {
    min: 'El nombre debe tener al menos 2 caracteres',
    max: 'El nombre no puede exceder 50 caracteres',
    invalid: 'El nombre solo puede contener letras y espacios'
  },
  email: {
    invalid: 'Por favor ingresa un email válido',
    min: 'El email debe tener al menos 5 caracteres',
    max: 'El email no puede exceder 100 caracteres'
  },
  phone: {
    invalid: 'Por favor ingresa un número de teléfono válido'
  },
  company: {
    max: 'El tamaño del grupo no puede exceder 50 caracteres'
  },
  subject: {
    required: 'Por favor selecciona un asunto',
    max: 'El asunto no puede exceder 100 caracteres'
  },
  message: {
    min: 'El mensaje debe tener al menos 10 caracteres',
    max: 'El mensaje no puede exceder 1000 caracteres',
    invalid: 'El mensaje debe contener texto válido'
  }
});