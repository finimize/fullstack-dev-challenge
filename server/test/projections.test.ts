import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import request from 'supertest'
import { createApp } from '../app.js'

const app = createApp()

describe('GET /api/projections', () => {
    it('returns a fixed 50-year projection for valid params', async () => {
        const res = await request(app)
            .get('/api/projections')
            .query({ initialSavings: 1000, monthlyDeposit: 100, annualInterestRate: 5 })
            .expect(200)

        const body = res.body as {
            points: Array<{ month: number; balance: number }>
        }
        // 50 years of monthly points, plus month 0.
        assert.equal(body.points.length, 601)
        assert.equal(body.points[0].balance, 1000)
        assert.ok(body.points[600].balance > body.points[0].balance)
    })

    it('rejects missing required params with a 400', async () => {
        const res = await request(app).get('/api/projections').expect(400)

        const body = res.body as { error: string; field: string }
        assert.equal(body.error, 'ValidationError')
        assert.equal(body.field, 'initialSavings')
    })

    it('rejects out-of-range values with a 400', async () => {
        const res = await request(app)
            .get('/api/projections')
            .query({ initialSavings: 1000, monthlyDeposit: 100, annualInterestRate: 500 })
            .expect(400)

        const body = res.body as { field: string }
        assert.equal(body.field, 'annualInterestRate')
    })
})
