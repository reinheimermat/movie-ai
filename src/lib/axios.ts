import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWYzZDJlMzY0NDljZGRmMDJmMzJlOWQ4NWI3ODVkNSIsIm5iZiI6MTczNzgxNjQ5My43NzEwMDAxLCJzdWIiOiI2Nzk0ZjlhZDc2MGY1MWUxN2QyYWRmNmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p7hOzLQxCgbMs_gnZBiGCVbPPVmydvutD3StTxIlVas',
  },
})
