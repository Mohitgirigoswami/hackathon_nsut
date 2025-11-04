# API Documentation

This document describes the REST API endpoints for the vaccination management system.

Base URL: `http://localhost:3000`

## Authentication

The API uses Better Auth for authentication. Authentication routes are handled at `/api/auth/*`.

## Villages API

### List all villages
- **Method:** GET
- **Endpoint:** `/api/villages`
- **Response:** Array of village objects

```bash
curl -X GET http://localhost:3000/api/villages
```

### Get village by ID
- **Method:** GET
- **Endpoint:** `/api/villages/:id`
- **Response:** Village object or 404 if not found

```bash
curl -X GET http://localhost:3000/api/villages/1
```

### Create new village
- **Method:** POST
- **Endpoint:** `/api/villages`
- **Request Body:**
```json
{
  "name": "Village Name",
  "description": "Optional description",
  "district": "District Name",
  "state": "State Name",
  "country": "India",
  "population": 1000,
  "areaSqKm": 50.5,
  "latitude": 28.6139,
  "longitude": 77.2090,
  "villageHead": "Head Name",
  "panchayatName": "Panchayat Name",
  "userId": "user-uuid"
}
```
- **Required fields:** name, district, state, population, userId

```bash
curl -X POST http://localhost:3000/api/villages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Village",
    "district": "Sample District",
    "state": "Sample State",
    "population": 1000,
    "userId": "user-123"
  }'
```

### Update village
- **Method:** PUT
- **Endpoint:** `/api/villages/:id`
- **Request Body:** Partial village object
- **Response:** Updated village object

```bash
curl -X PUT http://localhost:3000/api/villages/1 \
  -H "Content-Type: application/json" \
  -d '{
    "population": 1200,
    "description": "Updated description"
  }'
```

### Delete village
- **Method:** DELETE
- **Endpoint:** `/api/villages/:id`
- **Response:** Success message

```bash
curl -X DELETE http://localhost:3000/api/villages/1
```

## Beneficiaries API

### List all beneficiaries
- **Method:** GET
- **Endpoint:** `/api/beneficiaries`
- **Response:** Array of beneficiary objects

```bash
curl -X GET http://localhost:3000/api/beneficiaries
```

### Get beneficiary by ID
- **Method:** GET
- **Endpoint:** `/api/beneficiaries/:id`
- **Response:** Beneficiary object or 404 if not found

```bash
curl -X GET http://localhost:3000/api/beneficiaries/1
```

### Create new beneficiary
- **Method:** POST
- **Endpoint:** `/api/beneficiaries`
- **Request Body:**
```json
{
  "name": "Beneficiary Name",
  "dateOfBirth": "1990-01-01",
  "age": 34,
  "gender": "Male/Female/Other",
  "phone": "+91-1234567890",
  "email": "email@example.com",
  "address": "Address",
  "villageId": "village-uuid",
  "userId": "user-uuid",
  "benefitType": "vaccination/healthcare",
  "status": "active",
  "isEligible": true,
  "notes": "Optional notes"
}
```
- **Required fields:** name, villageId, userId, benefitType

```bash
curl -X POST http://localhost:3000/api/beneficiaries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "villageId": "village-123",
    "userId": "user-123",
    "benefitType": "vaccination"
  }'
```

### Update beneficiary
- **Method:** PUT
- **Endpoint:** `/api/beneficiaries/:id`
- **Request Body:** Partial beneficiary object

```bash
curl -X PUT http://localhost:3000/api/beneficiaries/1 \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+91-9876543210",
    "status": "inactive"
  }'
```

### Delete beneficiary
- **Method:** DELETE
- **Endpoint:** `/api/beneficiaries/:id`

```bash
curl -X DELETE http://localhost:3000/api/beneficiaries/1
```

## Drives API

### List all drives
- **Method:** GET
- **Endpoint:** `/api/drives`
- **Response:** Array of drive objects

```bash
curl -X GET http://localhost:3000/api/drives
```

### Get drive by ID
- **Method:** GET
- **Endpoint:** `/api/drives/:id`

```bash
curl -X GET http://localhost:3000/api/drives/1
```

### Create new drive
- **Method:** POST
- **Endpoint:** `/api/drives`
- **Request Body:**
```json
{
  "name": "Vaccination Drive 2024",
  "description": "Annual vaccination campaign",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "targetVillages": ["village-1", "village-2"],
  "targetVaccineTypes": ["Polio", "MMR"],
  "userId": "user-uuid",
  "status": "planned"
}
```
- **Required fields:** name, startDate, userId

```bash
curl -X POST http://localhost:3000/api/drives \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Drive",
    "startDate": "2024-01-01",
    "userId": "user-123"
  }'
```

### Update drive
- **Method:** PUT
- **Endpoint:** `/api/drives/:id`

```bash
curl -X PUT http://localhost:3000/api/drives/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active",
    "description": "Updated description"
  }'
```

### Delete drive
- **Method:** DELETE
- **Endpoint:** `/api/drives/:id`

```bash
curl -X DELETE http://localhost:3000/api/drives/1
```

### List all sessions
- **Method:** GET
- **Endpoint:** `/api/drives/sessions`

```bash
curl -X GET http://localhost:3000/api/drives/sessions
```

### Create new session
- **Method:** POST
- **Endpoint:** `/api/drives/sessions`
- **Request Body:**
```json
{
  "driveId": "drive-uuid",
  "sessionDate": "2024-01-15",
  "villageId": "village-uuid",
  "healthWorkers": ["Worker 1", "Worker 2"],
  "plannedBeneficiaries": 100,
  "actualBeneficiaries": 0,
  "vaccinesAdministered": ["Polio", "MMR"],
  "status": "scheduled",
  "notes": "Session notes",
  "userId": "user-uuid"
}
```
- **Required fields:** driveId, sessionDate, villageId, userId

```bash
curl -X POST http://localhost:3000/api/drives/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "driveId": "drive-123",
    "sessionDate": "2024-01-15",
    "villageId": "village-123",
    "userId": "user-123"
  }'
```

## Vaccine API

### List all vaccine types
- **Method:** GET
- **Endpoint:** `/api/vaccine/types`

```bash
curl -X GET http://localhost:3000/api/vaccine/types
```

### Create new vaccine type
- **Method:** POST
- **Endpoint:** `/api/vaccine/types`
- **Request Body:**
```json
{
  "name": "Polio Vaccine",
  "description": "Oral polio vaccine",
  "manufacturer": "WHO",
  "targetDisease": "Polio",
  "recommendedAgeMonths": 6,
  "dosage": "2 drops",
  "schedule": "Single dose",
  "isActive": true
}
```
- **Required fields:** name, targetDisease

```bash
curl -X POST http://localhost:3000/api/vaccine/types \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Vaccine",
    "targetDisease": "Sample Disease"
  }'
```

### List all vaccine batches
- **Method:** GET
- **Endpoint:** `/api/vaccine/batches`

```bash
curl -X GET http://localhost:3000/api/vaccine/batches
```

### Create new vaccine batch
- **Method:** POST
- **Endpoint:** `/api/vaccine/batches`
- **Request Body:**
```json
{
  "batchNumber": "BATCH001",
  "vaccineTypeId": "vaccine-type-uuid",
  "manufacturer": "Manufacturer Name",
  "expiryDate": "2025-01-01",
  "quantityReceived": 1000,
  "quantityUsed": 0,
  "storageTemperature": 2.5,
  "userId": "user-uuid"
}
```
- **Required fields:** batchNumber, vaccineTypeId, manufacturer, expiryDate, quantityReceived, userId

```bash
curl -X POST http://localhost:3000/api/vaccine/batches \
  -H "Content-Type: application/json" \
  -d '{
    "batchNumber": "BATCH001",
    "vaccineTypeId": "type-123",
    "manufacturer": "Sample Manufacturer",
    "expiryDate": "2025-01-01",
    "quantityReceived": 1000,
    "userId": "user-123"
  }'
```

### List all vaccination records
- **Method:** GET
- **Endpoint:** `/api/vaccine/records`

```bash
curl -X GET http://localhost:3000/api/vaccine/records
```

### Create new vaccination record
- **Method:** POST
- **Endpoint:** `/api/vaccine/records`
- **Request Body:**
```json
{
  "beneficiaryId": "beneficiary-uuid",
  "vaccineTypeId": "vaccine-type-uuid",
  "vaccineBatchId": "batch-uuid",
  "administeredDate": "2024-01-15",
  "administeredBy": "Health Worker Name",
  "userId": "user-uuid",
  "doseNumber": 1,
  "nextDueDate": "2024-02-15",
  "sideEffects": "None",
  "notes": "Vaccination completed successfully",
  "isCompleted": true
}
```
- **Required fields:** beneficiaryId, vaccineTypeId, administeredDate, administeredBy, userId

```bash
curl -X POST http://localhost:3000/api/vaccine/records \
  -H "Content-Type: application/json" \
  -d '{
    "beneficiaryId": "beneficiary-123",
    "vaccineTypeId": "type-123",
    "administeredDate": "2024-01-15",
    "administeredBy": "Dr. Smith",
    "userId": "user-123"
  }'
```

## Error Responses

All endpoints may return the following error responses:

- **400 Bad Request:** Missing required fields
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

Error response format:
```json
{
  "error": "Error message"
}
```

## Success Responses

Create operations return:
```json
{
  "message": "Resource created successfully",
  "resource": { ... }
}
```

Update operations return:
```json
{
  "message": "Resource updated successfully",
  "resource": { ... }
}
```

Delete operations return:
```json
{
  "message": "Resource deleted successfully"
}
```
