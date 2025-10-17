import axios from 'axios';
import type {
  CertificadoCursosResponse,
  ReporteNotasResponse,
  ReportePagosResponse,
  HistorialReporte
} from '@/types/reporte.types';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/reporte-test',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const reporteApi = {
  
  // Certificado de Cursos
  async obtenerCertificadoCursos(idEstudiante: number): Promise<CertificadoCursosResponse> {
    const response = await api.get(`/certificado-cursos/${idEstudiante}/preview`);
    return response.data;
  },

  async descargarCertificadoCursosPDF(idEstudiante: number): Promise<void> {
    const response = await api.get(`/certificado-cursos/${idEstudiante}/pdf`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificado_cursos_${idEstudiante}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Reporte de Notas
  async obtenerReporteNotas(idEstudiante: number, semestre: string): Promise<ReporteNotasResponse> {
    const response = await api.get(`/reporte-notas/${idEstudiante}/preview`, {
      params: { semestre }
    });
    return response.data;
  },

  async descargarReporteNotasPDF(idEstudiante: number, semestre: string): Promise<void> {
    const response = await api.get(`/reporte-notas/${idEstudiante}/pdf`, {
      params: { semestre },
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_notas_${semestre}_${idEstudiante}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Reporte de Pagos
  async obtenerReportePagos(idEstudiante: number): Promise<ReportePagosResponse> {
    const response = await api.get(`/reporte-pagos/${idEstudiante}/preview`);
    return response.data;
  },

  async descargarReportePagosPDF(idEstudiante: number): Promise<void> {
    const response = await api.get(`/reporte-pagos/${idEstudiante}/pdf`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_pagos_${idEstudiante}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Historial
  async obtenerHistorial(idEstudiante: number): Promise<HistorialReporte[]> {
    const response = await api.get(`/historial/${idEstudiante}`);
    return response.data;
  }
};