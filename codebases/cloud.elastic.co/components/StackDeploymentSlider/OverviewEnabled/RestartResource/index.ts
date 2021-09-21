/*
 * ELASTICSEARCH CONFIDENTIAL
 * __________________
 *
 *  Copyright Elasticsearch B.V. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Elasticsearch B.V. and its suppliers, if any.
 * The intellectual and technical concepts contained herein
 * are proprietary to Elasticsearch B.V. and its suppliers and
 * may be covered by U.S. and Foreign Patents, patents in
 * process, and are protected by trade secret or copyright
 * law.  Dissemination of this information or reproduction of
 * this material is strictly forbidden unless prior written
 * permission is obtained from Elasticsearch B.V.
 */

import { connect } from 'react-redux'

import RestartResource from './RestartResource'

import {
  restartStackDeploymentResource,
  resetRestartStackDeploymentResource,
} from '../../../../actions/stackDeployments'
import { restartStackDeploymentResourceRequest } from '../../../../reducers'

import {
  AnyResourceInfo,
  AsyncRequestState,
  SliderInstanceType,
  StackDeployment,
  ThunkDispatch,
} from '../../../../types'

type StateProps = {
  restartRequest: AsyncRequestState
}

type DispatchProps = {
  restart: () => void
  resetRestartRequest: () => void
}

type ConsumerProps = {
  deployment: StackDeployment
  resource: AnyResourceInfo
  sliderInstanceType: SliderInstanceType
}

const mapStateToProps = (
  state: any,
  { deployment, resource, sliderInstanceType }: ConsumerProps,
): StateProps => ({
  restartRequest: restartStackDeploymentResourceRequest(
    state,
    deployment.id,
    sliderInstanceType,
    resource.ref_id,
  ),
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch,
  { deployment, resource, sliderInstanceType }: ConsumerProps,
): DispatchProps => ({
  restart: () =>
    dispatch(
      restartStackDeploymentResource({
        deploymentId: deployment.id,
        resourceRefId: resource.ref_id,
        resourceType: sliderInstanceType,
      }),
    ),
  resetRestartRequest: () =>
    dispatch(resetRestartStackDeploymentResource(deployment.id, sliderInstanceType, resource.id)),
})

export default connect<StateProps, DispatchProps, ConsumerProps>(
  mapStateToProps,
  mapDispatchToProps,
)(RestartResource)
