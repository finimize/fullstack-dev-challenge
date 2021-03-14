export interface IProjection {
  month: number;
  deposit: number;
  interest: number;
  totalDeposit: number;
  totalInterest: number;
  balance: number;
}

export interface IProjectionRequest {
  principal: Number
  monthlyDeposit: Number
  interestRate: Number
}

export interface IProjectionResponse {
  projection: Array<IProjection>
}

const calculateProjection = async (requestData: IProjectionRequest): Promise<IProjection[]> => {
  const response = await fetch('http://localhost:3001/interest/compound', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(requestData)
  })
  const result = await response.json()

  return result.projection
}

export default calculateProjection
