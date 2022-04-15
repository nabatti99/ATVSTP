import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import ApartmentSvg from "../../components/Icons/ApartmentSvg";
import AlarmOnSvg from "../../components/Icons/AlarmOnSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import { DELETE_CERTIFICATE } from "./Modals/postActionTypes";

function CertificateDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { name } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState({
    name: "",
    manager: "",
    effective_time: "",
    image_url: "",
  });

  const getCertificate = async () => {
    setIsLoading(true);
    const { data } = await request.get(`certificate/${name}`);
    setCertificate(data);
    setIsLoading(false);
  };

  useEffect(() => getCertificate(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      if (state.action == DELETE_CERTIFICATE) {
        navigate("/UsersManagement/", {
          replace: true,
        });
        return;
      }

      getCertificate();
    }
  }, [state]);

  const { manager, effective_time, image_url, last_update } = certificate;

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
                  <ApartmentSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : manager}</Typography>
                </Stack>

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <AlarmOnSvg size={16} mr={1} />
                  <Typography variant="strong">
                    {isLoading ? skeleton : `Thời hạn: ${effective_time} Tháng`}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Typography variant="strong">Cập nhật lần cuối: {isLoading ? skeleton : last_update}</Typography>
          </Stack>

          <Stack>
            <ButtonIcon
              variant="contained"
              LeftIcon={ModeSvg}
              onClick={() => {
                navigate("Edit", {
                  state: certificate,
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
                  state: certificate,
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

export default CertificateDetails;
