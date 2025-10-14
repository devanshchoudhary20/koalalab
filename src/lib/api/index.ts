import { USE_MOCK_DATA } from './config'
import { mockApiClient } from './mock-client'
import { apiClient } from './client'

export const api = USE_MOCK_DATA ? mockApiClient : apiClient
