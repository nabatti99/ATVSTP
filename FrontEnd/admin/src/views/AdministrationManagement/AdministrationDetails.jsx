import { Box, Link, Paper, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import ApartmentSvg from "../../components/Icons/ApartmentSvg";
import AlarmOnSvg from "../../components/Icons/AlarmOnSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import { DELETE_ADMINISTRATION } from "./Modals/administrationActionTypes";
import PhoneSvg from "components/Icons/PhoneSvg";
import GroupSvg from "components/Icons/GroupSvg";

function AdministrationDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [administration, setAdministration] = useState({
    name: "",
    phone_number: "",
    responsible: {
      "Giám Đốc": [],
      "Phó Giám Đốc": [],
      "Thanh Tra": [],
    },
  });

  const getAdministration = async () => {
    setIsLoading(true);
    const { data } = await request.get(`administration/read/${_id}`);
    setAdministration(data);
    setIsLoading(false);
  };

  useEffect(() => getAdministration(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      if (state.action == DELETE_ADMINISTRATION) {
        navigate("/UsersManagement/", {
          replace: true,
        });
        return;
      }

      getAdministration();
    }
  }, [state]);

  const { name, phone_number, responsible } = administration;

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin Tổ chức thanh tra
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Stack direction="row">
              <Stack mt={2} ml={4}>
                <Typography variant="h4">{isLoading ? skeleton : name}</Typography>
                <Box width={100} height={2} bgcolor="gray.500" mt={2} />

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <PhoneSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : phone_number}</Typography>
                </Stack>

                <Stack direction="row" color="gray.700" alignItems="center" mt={2}>
                  <GroupSvg size={20} mr={1} />
                  <Typography variant="h5">{isLoading ? skeleton : "NHÂN SỰ"}</Typography>
                </Stack>

                {Object.keys(responsible).map((key) => (
                  <Stack key={key} direction="row" mt={2}>
                    <Typography variant="strong" color="gray.500" flexBasis="28%">
                      {key}:
                    </Typography>
                    <Stack>
                      {responsible[key].map((email) => (
                        <Typography variant="regular">
                          <Link href={`/UserDetail/${email}`} key={email} mb={1}>
                            {email}
                          </Link>
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <ButtonIcon
              variant="contained"
              LeftIcon={ModeSvg}
              onClick={() => {
                navigate("Edit", {
                  state: administration,
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
                  state: administration,
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

export default AdministrationDetails;
