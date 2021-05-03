{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "scratchapi.name" -}}
{{- default .Values.name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "scratchapi.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "scratchapi.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "scratchapi.deploymentname" -}}
{{- printf "%s-deployment" .Release.Name -}}
{{- end }}

{{- define "scratchapi.servicename" -}}
{{- printf "%s-service" .Release.Name -}}
{{- end }}

{{- define "scratchapi.databasename" -}}
{{- printf "%s-database" .Release.Name -}}
{{- end }}

{{- define "scratchapi.dbservicename" -}}
{{- printf "%s-db-service" .Release.Name -}}
{{- end }}

{{- define "scratchapi.secretname" -}}
{{- printf "%s-secret" .Release.Name -}}
{{- end }}

{{- define "scratchapi.jobname" -}}
{{- printf "%s-job" .Release.Name -}}
{{- end }}

{{/*
Common labels
*/}}
{{- define "scratchapi.labels" -}}
helm.sh/chart: {{ include "scratchapi.chart" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "scratchapi.selectorLabels" -}}
app.kubernetes.io/name: {{ include "scratchapi.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/projectname: {{ required "a projectname is required" .Values.projectname }}

{{- end }}

{{- define "scratchapi.dbSelectorLabels" -}}
{{ include "scratchapi.selectorLabels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.database.tier }}
{{- end }}

{{- define "scratchapi.dbLabels" -}}
{{ include "scratchapi.selectorLabels" . }}
{{ include "scratchapi.labels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.database.tier }}
{{- end }}

{{- define "scratchapi.appLabels" -}}
{{ include "scratchapi.selectorLabels" . }}
{{ include "scratchapi.labels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.backend.tier }}
{{- end }}

{{- define "scratchapi.appSelectorLabels" -}}
{{ include "scratchapi.selectorLabels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.backend.tier }}
{{- end }}