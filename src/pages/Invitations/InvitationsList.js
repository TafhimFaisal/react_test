import React,{useState,useEffect} from 'react'
import { Button,Card,Table, Space,Modal,notification,Spin } from 'antd';
import { useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { setPendingInvitations,setAcceptedInvitations } from '../../redux/actions/InviteAction';
import { EditOutlined,DeleteOutlined,EyeOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import { useParams } from 'react-router';

const { confirm } = Modal;
export default function InvitationsList() {
    const navigate = useNavigate()
    const auth = useSelector( (state) => state.auth);
    const [invites, setInvites] = useState([])
    const { type } = useParams()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [showLoader, setShowLoader] = useState(true)
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: 4,
      }
    });

    useEffect(() => {
      setShowLoader(true)
      setLoading(true)
      let invites = type == 'pending' ?  setPendingInvitations : setAcceptedInvitations
      dispatch(
        invites({
          callBack:(response)=>{
            setShowLoader(false)
            setLoading(false)
            setInvites(response.data)
          }
        })
      )
      

    }, [type])

    const columns = [
      {
        title: 'Email',
        key: 'email',
        render: (text,record) => type == 'pending' ? record.emailInvitedTo : record.email  
      }
    ];
      
    return (
        <div>
            <Card title={`${type} invitations`} extra={
                <>
                  <Button onClick={()=>navigate('/send/invite')} type="dashed">Send Invite</Button>
                  <Button onClick={()=>navigate(`/${type == 'pending' ? 'accepted' : 'pending'}/invitations`)} type="dashed">{`${type == 'pending' ? 'accepted' : 'pending'} Invitations`}</Button>
                </>
              }>
              <Spin spinning={showLoader}>
                <Table
                  columns={columns}
                  dataSource={invites}
                  pagination={{
                    current:tableParams.pagination.current,
                    pageSize:tableParams.pagination.pageSize,
                    total:invites.length,
                    onChange:(page,size)=>{
                      setTableParams({
                        pagination: {
                          current: page,
                          pageSize: size,
                        }
                      })
                    }
                  }}
                />
              </Spin>
            </Card>
        </div>
    )
}
