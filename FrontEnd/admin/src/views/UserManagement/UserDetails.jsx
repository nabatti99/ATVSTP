import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import MailSvg from "components/Icons/MailSvg";
import PhoneSvg from "components/Icons/PhoneSvg";
import LocationPinSvg from "components/Icons/LocationPinSvg";
import EventNoteSvg from "components/Icons/EventNoteSvg";
import Image from "components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import ReplaySvg from "components/Icons/ReplaySvg";
import { getDateDelete } from "utilities/formatDate";
import KeySvg from "components/Icons/KeySvg";
import { connectAppContext } from "contexts/appContext/appContext";

function UserDetails({ appContext }) {
  const request = useRequest();
  const navigate = useNavigate();

  const { email } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type_manager: "",
    image_url: "",
    work_from: "",
    date_delete: null,
  });

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await request.get(`manager/get_a_manager/${email}`);
      setProfile(data);
    } catch (error) {
      console.error(error);
      navigate("/NotFound", {
        replace: true,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => getProfile(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      getProfile();
    }
  }, [state]);

  const { name, phone, address, type_manager, image_url, work_from, date_delete } = profile;

  const isAdmin = appContext.type_manager == "admin";
  const isOwnAccount = appContext.userEmail == email;

  let buttonELements = isAdmin && (
    <Stack>
      <ButtonIcon
        variant="outlined"
        color="blue"
        LeftIcon={KeySvg}
        onClick={() => {
          navigate("ResetPassword", {
            state: profile,
          });
        }}
        sx={{ marginBottom: 2 }}
      >
        Đặt lại mật khẩu
      </ButtonIcon>
      <ButtonIcon
        variant="contained"
        LeftIcon={ModeSvg}
        onClick={() => {
          navigate("Edit", {
            state: profile,
          });
        }}
        sx={{ marginBottom: 2 }}
      >
        Chỉnh sửa
      </ButtonIcon>

      {date_delete ? (
        <ButtonIcon
          variant="contained"
          color="green"
          LeftIcon={ReplaySvg}
          onClick={() => {
            request.put(`manager/restore_a_manager/${email}`).then(() => getProfile());
          }}
        >
          Khôi phục
        </ButtonIcon>
      ) : (
        <ButtonIcon
          variant="contained"
          color="red"
          LeftIcon={DeleteSvg}
          onClick={() => {
            navigate("Delete", {
              state: profile,
            });
          }}
        >
          Xoá
        </ButtonIcon>
      )}
    </Stack>
  );

  if (isOwnAccount) {
    buttonELements = (
      <Stack>
        <ButtonIcon
          variant="outlined"
          color="blue"
          LeftIcon={KeySvg}
          onClick={() => {
            navigate("ChangePassword", {
              state: profile,
            });
          }}
          sx={{ marginBottom: 2 }}
        >
          Đặt lại mật khẩu
        </ButtonIcon>
        <ButtonIcon
          variant="contained"
          LeftIcon={ModeSvg}
          onClick={() => {
            navigate("Edit", {
              state: profile,
            });
          }}
          sx={{ marginBottom: 2 }}
        >
          Chỉnh sửa
        </ButtonIcon>
      </Stack>
    );
  }

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin cá nhân
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Stack direction="row">
              {isLoading ? skeleton : <Image src={image_url} width={160} height={160}></Image>}
              <Stack mt={2} ml={4}>
                <Typography variant="h4">{isLoading ? skeleton : name}</Typography>
                <Box width={100} height={2} bgcolor="gray.500" mt={2} />

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <MailSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : email}</Typography>
                </Stack>

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <PhoneSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : phone}</Typography>
                </Stack>

                <Typography variant="strong" color="red.500" mt={1}>
                  {isLoading ? skeleton : type_manager == "admin" ? "Admin" : "Inspector"}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" color="gray.500" mt={2}>
              <LocationPinSvg size={16} mr={1} />
              <Typography variant="strong">{isLoading ? skeleton : address}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" color="gray.500" mt={1}>
              <EventNoteSvg size={16} mr={1} />
              <Typography variant="strong">Công tác tại: {isLoading ? skeleton : work_from}</Typography>
            </Stack>

            {date_delete && (
              <Typography variant="strong" color="red.500" mt={4}>
                Tài khoản này sẽ bị xoá vĩnh viễn sau: {getDateDelete(date_delete)}
              </Typography>
            )}
          </Stack>

          {buttonELements}
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default connectAppContext(UserDetails);
