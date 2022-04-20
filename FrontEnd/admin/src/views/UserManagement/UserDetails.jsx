import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import MailSvg from "../../components/Icons/MailSvg";
import PhoneSvg from "../../components/Icons/PhoneSvg";
import LocationPinSvg from "../../components/Icons/LocationPinSvg";
import EventNoteSvg from "../../components/Icons/EventNoteSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import { DELETE_PROFILE } from "./Modals/profileActionTypes";

function UserDetails() {
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
  });

  const getProfile = async () => {
    setIsLoading(true);
    const { data } = await request.get(`manager/get_a_manager/${email}`);
    setProfile(data);
    setIsLoading(false);
  };

  useEffect(() => getProfile(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      if (state.action == DELETE_PROFILE) {
        navigate("/UsersManagement/", {
          replace: true,
        });
        return;
      }

      getProfile().catch((err) => {
        console.log(err.response);
        navigate("/NotFound", {
          replace: true,
        });
      });
    }
  }, [state]);

  const { name, phone, address, type_manager, image_url, work_from } = profile;

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
          </Stack>

          <Stack>
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
          </Stack>
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default UserDetails;
